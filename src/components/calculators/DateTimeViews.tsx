import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { RegionalLocale } from '../../types/calculator';
import { formatDate, formatNumber } from '../../utils/formatters';
import { saveCalculationHistory } from '../../utils/history';
import { CalculatorField } from '../calculator-ui/CalculatorField';
import { CalculatorKeypad } from '../calculator-ui/CalculatorKeypad';
import { CalculatorResultCard } from '../calculator-ui/CalculatorResultCard';
import { useCalculatorInput } from '../../hooks/useCalculatorInput';

interface BaseCalculatorProps {
  id: string;
  name: string;
  locale: RegionalLocale;
  initialInputs?: Record<string, string | number>;
}

// 1. Days Between Dates Calculator (Phone Calculator Experience)
export const DaysBetweenDatesView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(nextMonth);
  const [includeEndDay, setIncludeEndDay] = useState(false);

  const d1 = new Date(startDate);
  const d2 = new Date(endDate);

  const diffMs = d2.getTime() - d1.getTime();
  const rawDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const totalDays = rawDays + (includeEndDay && rawDays >= 0 ? 1 : 0);

  const weeks = Math.floor(Math.abs(totalDays) / 7);
  const remainingDays = Math.abs(totalDays) % 7;

  useEffect(() => {
    saveCalculationHistory({
      calculatorId: id,
      calculatorName: name,
      inputSummary: `${startDate} to ${endDate}`,
      resultSummary: `${totalDays} days`
    });
  }, [startDate, endDate, includeEndDay]);

  const setOffsetPreset = (offsetDays: number) => {
    const start = new Date();
    const end = new Date(Date.now() + offsetDays * 86400000);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Quick Period Presets */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="text-slate-400 font-medium self-center text-[11px] mr-1">Presets:</span>
        <button type="button" onClick={() => setOffsetPreset(7)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">1 Week</button>
        <button type="button" onClick={() => setOffsetPreset(30)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">30 Days</button>
        <button type="button" onClick={() => setOffsetPreset(90)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">90 Days</button>
        <button type="button" onClick={() => setOffsetPreset(365)} className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">1 Year</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer select-none px-1">
        <input
          type="checkbox"
          checked={includeEndDay}
          onChange={(e) => setIncludeEndDay(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
        />
        <span>Include end date in total day count (adds +1 day)</span>
      </label>

      {/* Hero Result */}
      <CalculatorResultCard
        label="CALENDAR DAYS ELAPSED"
        result={`${totalDays} ${Math.abs(totalDays) === 1 ? 'Day' : 'Days'}`}
        subtext={`Equal to ${weeks} weeks and ${remainingDays} days (${formatNumber(totalDays * 24, { decimals: 0 })} hours).`}
        details={[
          { label: 'Full Weeks', value: `${weeks} Weeks` },
          { label: 'Remaining Days', value: `${remainingDays} Days` },
          { label: 'Total Hours', value: `${formatNumber(totalDays * 24, { decimals: 0 })} hrs` }
        ]}
        variant="blue"
      />
    </div>
  );
};

// 2. Age Calculator (Phone Calculator Experience)
export const AgeCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const [birthDate, setBirthDate] = useState('1995-05-20');
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);

  const b = new Date(birthDate);
  const a = new Date(asOfDate);

  let years = a.getFullYear() - b.getFullYear();
  let months = a.getMonth() - b.getMonth();
  let days = a.getDate() - b.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(a.getFullYear(), a.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDaysLived = Math.floor((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDaysLived / 7);

  const currentYearBday = new Date(a.getFullYear(), b.getMonth(), b.getDate());
  const nextBday = currentYearBday < a ? new Date(a.getFullYear() + 1, b.getMonth(), b.getDate()) : currentYearBday;
  const daysUntilNextBday = Math.ceil((nextBday.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Calculate Age as of
          </label>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <CalculatorResultCard
        label="EXACT CHRONOLOGICAL AGE"
        result={`${years} Years, ${months} Months, ${days} Days`}
        subtext={`Next birthday is in ${daysUntilNextBday} days on ${formatDate(nextBday, locale)}.`}
        details={[
          { label: 'Total Months', value: `${years * 12 + months}` },
          { label: 'Total Weeks', value: `${formatNumber(totalWeeks, { decimals: 0 })}` },
          { label: 'Days Lived', value: `${formatNumber(totalDaysLived, { decimals: 0 })}` },
          { label: 'Total Hours', value: `${formatNumber(totalDaysLived * 24, { decimals: 0 })}` }
        ]}
        variant="blue"
      />
    </div>
  );
};

// 3. Business Days Calculator (Phone Calculator Experience)
export const BusinessDaysCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const today = new Date().toISOString().split('T')[0];
  const future = new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(future);

  let workDays = 0;
  let weekendDays = 0;

  const s = new Date(startDate);
  const e = new Date(endDate);

  if (s <= e) {
    const cur = new Date(s);
    while (cur <= e) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        workDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white"
          />
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-medium focus:bg-white"
          />
        </div>
      </div>

      <CalculatorResultCard
        label="BUSINESS WORKING DAYS"
        result={`${workDays} Work Days`}
        subtext={`Calculated across a total of ${workDays + weekendDays} calendar days (${weekendDays} weekend days excluded).`}
        details={[
          { label: 'Work Days', value: `${workDays}` },
          { label: 'Weekend Days', value: `${weekendDays}` },
          { label: 'Total Calendar', value: `${workDays + weekendDays}` }
        ]}
        variant="blue"
      />
    </div>
  );
};

// 4. Days From Today Calculator (Inputs -> Output -> Keypad)
export const DaysFromTodayView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const calc = useCalculatorInput({ days: '' }, ['days']);
  const [direction, setDirection] = useState<'future' | 'past'>('future');

  const offset = parseInt(calc.values.days, 10) || 0;
  const targetTime = Date.now() + (direction === 'future' ? 1 : -1) * offset * 86400000;
  const targetDate = new Date(targetTime);
  const dayOfWeekName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setDirection('future')}
          className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
            direction === 'future' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          Days Future (+)
        </button>
        <button
          type="button"
          onClick={() => setDirection('past')}
          className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
            direction === 'past' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          Days Ago (−)
        </button>
      </div>

      <CalculatorField
        label="Number of Days"
        value={calc.values.days}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix="days"
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label={direction === 'future' ? `${calc.values.days || 0} DAYS IN THE FUTURE` : `${calc.values.days || 0} DAYS AGO`}
        result={`${dayOfWeekName}, ${formatDate(targetDate, locale)}`}
        subtext={`Exact calendar date offset from today.`}
        variant="blue"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>
    </div>
  );
};

// 5. Time Duration Calculator (Inputs -> Output -> Keypad)
export const TimeDurationCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name }) => {
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:15');
  const calc = useCalculatorInput({ breakMin: '' }, ['breakMin']);

  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);

  let startTotalMin = (sh || 0) * 60 + (sm || 0);
  let endTotalMin = (eh || 0) * 60 + (em || 0);

  if (endTotalMin < startTotalMin) {
    endTotalMin += 24 * 60;
  }

  const grossMin = endTotalMin - startTotalMin;
  const breakMin = parseInt(calc.values.breakMin, 10) || 0;
  const netMin = Math.max(0, grossMin - breakMin);

  const hours = Math.floor(netMin / 60);
  const mins = netMin % 60;
  const decimalHours = netMin / 60;

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      {/* 1. INPUTS ON TOP */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl space-y-0.5">
          <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs sm:text-sm font-mono font-medium focus:bg-white"
          />
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl space-y-0.5">
          <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-xs sm:text-sm font-mono font-medium focus:bg-white"
          />
        </div>
      </div>

      <CalculatorField
        label="Unpaid Break"
        value={calc.values.breakMin}
        isActive={true}
        onSelect={() => {}}
        onClear={calc.handleClear}
        suffix="min"
        placeholder="0"
      />

      {/* 2. OUTPUT UNDER INPUTS */}
      <CalculatorResultCard
        label="NET DURATION"
        result={`${hours} hrs, ${mins} mins`}
        subtext={`Decimal payroll equivalent: ${formatNumber(decimalHours, { decimals: 2 })} hrs (Gross: ${Math.floor(grossMin / 60)}h ${grossMin % 60}m).`}
        variant="blue"
        onReset={calc.handleClearAll}
      />

      {/* 3. KEYPAD UNDER RESULT */}
      <div className="bg-slate-50/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
        <CalculatorKeypad
          onDigit={calc.handleDigit}
          onDecimal={calc.handleDecimal}
          onBackspace={calc.handleBackspace}
          onClear={calc.handleClearAll}
          onClearActive={calc.handleClear}
        />
      </div>
    </div>
  );
};

// 6. Countdown Calculator (Phone Calculator Experience)
export const CountdownCalculatorView: React.FC<BaseCalculatorProps> = ({ id, name, initialInputs }) => {
  const currentYear = new Date().getFullYear();
  const [selectedHoliday, setSelectedHoliday] = useState<string>(
    initialInputs?.holiday ? String(initialInputs.holiday) : 'christmas'
  );
  const [customDate, setCustomDate] = useState(`${currentYear}-12-25T00:00`);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTargetTimestamp = (): number => {
    const yr = new Date(now).getFullYear();
    if (selectedHoliday === 'christmas') {
      const cThisYear = new Date(yr, 11, 25, 0, 0, 0).getTime();
      return cThisYear < now ? new Date(yr + 1, 11, 25, 0, 0, 0).getTime() : cThisYear;
    }
    if (selectedHoliday === 'newyear') {
      return new Date(yr + 1, 0, 1, 0, 0, 0).getTime();
    }
    if (selectedHoliday === 'halloween') {
      const hThisYear = new Date(yr, 9, 31, 0, 0, 0).getTime();
      return hThisYear < now ? new Date(yr + 1, 9, 31, 0, 0, 0).getTime() : hThisYear;
    }
    return new Date(customDate).getTime();
  };

  const targetTs = getTargetTimestamp();
  const diff = Math.max(0, targetTs - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSelectedHoliday('christmas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            selectedHoliday === 'christmas' ? 'bg-red-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Christmas
        </button>
        <button
          type="button"
          onClick={() => setSelectedHoliday('newyear')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            selectedHoliday === 'newyear' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          New Year
        </button>
        <button
          type="button"
          onClick={() => setSelectedHoliday('halloween')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            selectedHoliday === 'halloween' ? 'bg-orange-600 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Halloween
        </button>
        <button
          type="button"
          onClick={() => setSelectedHoliday('custom')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            selectedHoliday === 'custom' ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Custom Date
        </button>
      </div>

      {selectedHoliday === 'custom' && (
        <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Target Date & Time
          </label>
          <input
            type="datetime-local"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:bg-white"
          />
        </div>
      )}

      {/* Live Digital Display Cards */}
      <div className="grid grid-cols-4 gap-2 text-center select-none">
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums">{days}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Days</div>
        </div>
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums">{hours}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Hours</div>
        </div>
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums">{minutes}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Mins</div>
        </div>
        <div className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-sm border border-blue-500">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums">{seconds}</div>
          <div className="text-[10px] text-blue-100 uppercase tracking-wider mt-0.5">Secs</div>
        </div>
      </div>
    </div>
  );
};

// 7. Time Zone Planner (Interactive Multi-City Meeting Planner & Overlap Matrix)
export const TimeZonePlannerView: React.FC<BaseCalculatorProps> = ({ id, name, locale }) => {
  const CITIES = [
    { id: 'nyc', name: 'New York (EDT/EST)', offset: -5, tz: 'America/New_York' },
    { id: 'sfo', name: 'San Francisco (PDT/PST)', offset: -8, tz: 'America/Los_Angeles' },
    { id: 'chi', name: 'Chicago (CDT/CST)', offset: -6, tz: 'America/Chicago' },
    { id: 'lon', name: 'London (BST/GMT)', offset: 0, tz: 'Europe/London' },
    { id: 'par', name: 'Paris / Berlin (CEST/CET)', offset: 1, tz: 'Europe/Paris' },
    { id: 'dxb', name: 'Dubai (GST)', offset: 4, tz: 'Asia/Dubai' },
    { id: 'sin', name: 'Singapore / HK (SGT/HKT)', offset: 8, tz: 'Asia/Singapore' },
    { id: 'tyo', name: 'Tokyo (JST)', offset: 9, tz: 'Asia/Tokyo' },
    { id: 'syd', name: 'Sydney (AEST/AEDT)', offset: 10, tz: 'Australia/Sydney' }
  ];

  const [baseCityId, setBaseCityId] = useState('nyc');
  const [targetCityId, setTargetCityId] = useState('lon');
  const [selectedHour, setSelectedHour] = useState(10); // 10 AM

  const baseCity = CITIES.find((c) => c.id === baseCityId) || CITIES[0];
  const targetCity = CITIES.find((c) => c.id === targetCityId) || CITIES[3];

  const diffHours = targetCity.offset - baseCity.offset;
  const targetHour = (selectedHour + diffHours + 24) % 24;

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:00 ${period}`;
  };

  const getHourStatus = (h: number) => {
    if (h >= 9 && h <= 17) return 'work';
    if ((h >= 7 && h < 9) || (h > 17 && h <= 21)) return 'awake';
    return 'sleep';
  };

  // Find all mutual working hours (9am to 5pm in both cities)
  const overlappingHours: number[] = [];
  for (let h = 0; h < 24; h++) {
    const tH = (h + diffHours + 24) % 24;
    if (getHourStatus(h) === 'work' && getHourStatus(tH) === 'work') {
      overlappingHours.push(h);
    }
  }

  const applyPairPreset = (bId: string, tId: string, defaultH: number) => {
    setBaseCityId(bId);
    setTargetCityId(tId);
    setSelectedHour(defaultH);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      {/* Quick Pair Presets */}
      <div className="flex flex-wrap gap-1.5 text-xs">
        <span className="text-slate-400 font-medium self-center text-[11px] mr-1">Corridors:</span>
        <button type="button" onClick={() => applyPairPreset('nyc', 'lon', 10)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">NY ↔ London</button>
        <button type="button" onClick={() => applyPairPreset('sfo', 'lon', 9)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">SF ↔ London</button>
        <button type="button" onClick={() => applyPairPreset('sfo', 'tyo', 16)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">SF ↔ Tokyo</button>
        <button type="button" onClick={() => applyPairPreset('lon', 'syd', 8)} className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700">London ↔ Sydney</button>
      </div>

      {/* City Selectors */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Your Base City</label>
          <select
            value={baseCityId}
            onChange={(e) => setBaseCityId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === targetCityId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Target City</label>
          <select
            value={targetCityId}
            onChange={(e) => setTargetCityId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id} disabled={c.id === baseCityId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Time Slider */}
      <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-600">Select Meeting Time:</span>
          <span className="font-extrabold text-blue-600 font-mono text-sm bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
            {formatHour(selectedHour)} ({baseCity.name.split(' ')[0]})
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="23"
          step="1"
          value={selectedHour}
          onChange={(e) => setSelectedHour(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
      </div>

      {/* Paired Result Display Cards */}
      <div className="grid grid-cols-2 gap-2">
        <CalculatorResultCard
          label={`${baseCity.name.split(' ')[0].toUpperCase()} TIME`}
          result={formatHour(selectedHour)}
          subtext={getHourStatus(selectedHour) === 'work' ? '🟢 Business hours' : getHourStatus(selectedHour) === 'awake' ? '🟡 Early / Evening' : '🌙 Sleeping hours'}
          variant="blue"
        />
        <CalculatorResultCard
          label={`${targetCity.name.split(' ')[0].toUpperCase()} TIME`}
          result={formatHour(targetHour)}
          subtext={getHourStatus(targetHour) === 'work' ? '🟢 Business hours' : getHourStatus(targetHour) === 'awake' ? '🟡 Early / Evening' : '🌙 Sleeping hours'}
          variant={getHourStatus(targetHour) === 'work' ? 'emerald' : getHourStatus(targetHour) === 'awake' ? 'slate' : 'purple'}
        />
      </div>

      {/* Mutual Business Hours Recommendation */}
      <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 rounded-2xl text-xs space-y-1">
        <div className="font-bold text-blue-900 flex items-center gap-1.5">
          <span>💡 Recommended Meeting Window</span>
        </div>
        {overlappingHours.length > 0 ? (
          <p className="text-slate-700 leading-relaxed">
            Mutual 9 AM–5 PM overlap exists between{' '}
            <strong className="text-blue-800">
              {formatHour(overlappingHours[0])} – {formatHour(overlappingHours[overlappingHours.length - 1] + 1)} ({baseCity.name.split(' ')[0]})
            </strong>{' '}
            which corresponds to{' '}
            <strong className="text-indigo-800">
              {formatHour((overlappingHours[0] + diffHours + 24) % 24)} – {formatHour(((overlappingHours[overlappingHours.length - 1] + diffHours + 24) % 24) + 1)} ({targetCity.name.split(' ')[0]})
            </strong>.
          </p>
        ) : (
          <p className="text-amber-800 leading-relaxed">
            No standard 9 AM–5 PM overlap. A compromise call can be scheduled at{' '}
            <strong>{formatHour(selectedHour)} ({baseCity.name.split(' ')[0]})</strong>, which is{' '}
            <strong>{formatHour(targetHour)} ({targetCity.name.split(' ')[0]})</strong>.
          </p>
        )}
      </div>

      {/* 24-Hour Visual Heatmap Matrix */}
      <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-700">24-Hour Schedule Matrix</span>
          <div className="flex gap-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Work</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>Awake</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 inline-block"></span>Sleep</span>
          </div>
        </div>

        {/* Base City Row */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-600 flex justify-between">
            <span>{baseCity.name.split(' ')[0]} (UTC{baseCity.offset >= 0 ? `+${baseCity.offset}` : baseCity.offset})</span>
          </div>
          <div className="grid gap-0.5 h-6 rounded-lg overflow-hidden border border-slate-200" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
            {Array.from({ length: 24 }).map((_, h) => {
              const status = getHourStatus(h);
              const isSelected = h === selectedHour;
              return (
                <button
                  key={h}
                  type="button"
                  onClick={() => setSelectedHour(h)}
                  title={`${baseCity.name.split(' ')[0]}: ${formatHour(h)}`}
                  className={`h-full transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-600 z-10 scale-110' : ''
                  } ${
                    status === 'work' ? 'bg-emerald-400 hover:bg-emerald-500' : status === 'awake' ? 'bg-amber-300 hover:bg-amber-400' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Target City Row */}
        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-600 flex justify-between">
            <span>{targetCity.name.split(' ')[0]} (UTC{targetCity.offset >= 0 ? `+${targetCity.offset}` : targetCity.offset})</span>
          </div>
          <div className="grid gap-0.5 h-6 rounded-lg overflow-hidden border border-slate-200" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
            {Array.from({ length: 24 }).map((_, h) => {
              const tH = (h + diffHours + 24) % 24;
              const status = getHourStatus(tH);
              const isSelected = h === selectedHour;
              return (
                <button
                  key={h}
                  type="button"
                  onClick={() => setSelectedHour(h)}
                  title={`${targetCity.name.split(' ')[0]}: ${formatHour(tH)}`}
                  className={`h-full transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-600 z-10 scale-110' : ''
                  } ${
                    status === 'work' ? 'bg-emerald-400 hover:bg-emerald-500' : status === 'awake' ? 'bg-amber-300 hover:bg-amber-400' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

