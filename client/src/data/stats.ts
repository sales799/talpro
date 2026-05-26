/**
 * Company-wide statistics displayed in the StatsBar and
 * referenced throughout service/industry pages.
 */

export interface Stat {
  /** Display value, e.g. "500+" */
  value: string;
  /** Numeric target for the count-up animation */
  numericValue: number;
  /** Suffix appended after the number ("+", "%", "hr") */
  suffix: string;
  /** Short label below the number */
  label: string;
}

export const companyStats: Stat[] = [
  {
    value: '15+',
    numericValue: 15,
    suffix: '+',
    label: 'Years in IT Staffing',
  },
  {
    value: '500+',
    numericValue: 500,
    suffix: '+',
    label: 'Placements Made',
  },
  {
    value: '90%+',
    numericValue: 90,
    suffix: '%',
    label: 'Client Retention',
  },
  {
    value: '<48hr',
    numericValue: 48,
    suffix: 'hr',
    label: 'First Shortlist',
  },
];
