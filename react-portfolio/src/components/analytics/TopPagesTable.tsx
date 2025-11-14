import { motion } from 'framer-motion';
import type { PageView } from '@/types';
import styles from './TopPagesTable.module.css';

interface TopPagesTableProps {
  pages: PageView[];
  maxItems?: number;
}

/**
 * Top Pages Table Component
 * Displays the most viewed pages in a table format
 */
export const TopPagesTable = ({ pages, maxItems = 10 }: TopPagesTableProps) => {
  const displayPages = pages.slice(0, maxItems);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.title}>Top Pages</h3>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>Unique</th>
              <th>Avg Time</th>
            </tr>
          </thead>
          <tbody>
            {displayPages.map((page, index) => (
              <motion.tr
                key={page.path}
                className={styles.row}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td>
                  <div className={styles.pageInfo}>
                    <span className={styles.rank}>#{index + 1}</span>
                    <div>
                      <div className={styles.pageTitle}>{page.title}</div>
                      <div className={styles.pagePath}>{page.path}</div>
                    </div>
                  </div>
                </td>
                <td className={styles.number}>{page.views.toLocaleString()}</td>
                <td className={styles.number}>{page.uniqueViews.toLocaleString()}</td>
                <td className={styles.number}>{Math.floor(page.avgTimeOnPage)}s</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

