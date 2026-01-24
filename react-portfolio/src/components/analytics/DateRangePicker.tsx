import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DateRange } from '@/types';
import styles from './DateRangePicker.module.css';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
] as const;

/**
 * Date Range Picker Component
 * Allows selecting date ranges with presets or custom dates
 */
export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    onChange({
      start,
      end,
      preset: days === 7 ? '7d' : days === 30 ? '30d' : '90d',
    });
    setIsOpen(false);
  };

  const handleCustomDateChange = (type: 'start' | 'end', dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return;

    onChange({
      ...value,
      [type]: date,
      preset: 'custom',
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select date range"
      >
        <i className="fas fa-calendar-alt" />
        <span>
          {formatDate(value.start)} - {formatDate(value.end)}
        </span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.presets}>
              <h4 className={styles.sectionTitle}>Quick Select</h4>
              {PRESETS.map((preset) => (
                <button
                  key={preset.days}
                  className={styles.presetButton}
                  onClick={() => handlePresetClick(preset.days)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className={styles.custom}>
              <h4 className={styles.sectionTitle}>Custom Range</h4>
              <div className={styles.dateInputs}>
                <div>
                  <label htmlFor="start-date">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    value={value.start.toISOString().split('T')[0]}
                    onChange={(e) => handleCustomDateChange('start', e.target.value)}
                    max={value.end.toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label htmlFor="end-date">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    value={value.end.toISOString().split('T')[0]}
                    onChange={(e) => handleCustomDateChange('end', e.target.value)}
                    min={value.start.toISOString().split('T')[0]}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

