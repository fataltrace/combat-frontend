import PropTypes from 'prop-types'
import styles from './styles.js'

function BaseLayout ({ children: router }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        {router}
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

BaseLayout.propTypes = {}

export default BaseLayout