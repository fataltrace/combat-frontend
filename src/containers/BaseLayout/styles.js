import { css } from '@emotion/css'

const styles = {
  root: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: 0,
    gridTemplateAreas: `
      "header header header header"
      "content content content content"
      "footer footer footer footer"
    `
  }),
  header: css({ gridArea: 'header' }),
  content: css({ gridArea: 'content' }),
  footer: css({ gridArea: 'footer' })
}

export default styles