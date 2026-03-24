import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const REACT_PDF_STYLES = StyleSheet.create({
  page: {
    padding: '40px',
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column'
  },
  left: {
    width: '40%',
    paddingRight: '10px'
  },
  right: {
    width: '60%'
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  blockLeft: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textAlign: 'right'
  },
  section: {
    display: 'flex',
    flexDirection: 'row'
  },
  primaryItem: {
    padding: 0,
    fontSize: 14,
    fontWeight: 400
  },
  primaryItemLeft: {
    padding: 0,
    fontSize: 14,
    fontWeight: 400,
    textAlign: 'right'
  },
  secondaryItem: {
    marginTop: '3.5px',
    padding: 0,
    fontSize: 9.5,
    fontWeight: 400
  },
  secondaryItemLeft: {
    marginTop: '3.5px',
    padding: 0,
    fontSize: 9.5,
    fontWeight: 400,
    textAlign: 'right'
  },
  regularItem: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    fontWeight: 200,
    textAlign: 'left',
    color: '#333333'
  },
  regularItemBold: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    fontWeight: 400,
    textAlign: 'left',
    color: '#000000'
  },
  regularItemItalic: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    fontWeight: 200,
    fontStyle: 'italic',
    textAlign: 'left'
  },
  mainItemTitle: {
    margin: '2px 0px',
    padding: 0,
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'left'
  },
  mainItemTitleRight: {
    margin: '2px 0px',
    padding: 0,
    fontSize: 30,
    fontWeight: 800,
    textAlign: 'right'
  },
  skillSubTitle: {
    marginTop: 3,
    marginBottom: 1
  },
  skillsInset: {
    padding: '7px 0px 7px 0px',
    fontSize: 10,
    fontWeight: 400,
    fontStyle: 'italic',
    textAlign: 'left'
  },
  skillsInsetLeft: {
    margin: 0,
    padding: 0,
    fontSize: 9,
    fontWeight: 200,
    textAlign: 'right'
  },
  namedTitle: {
    fontWeight: 200,
    fontSize: 12
  },
  tagTitle: { fontSize: 14, fontWeight: 600 }
});
