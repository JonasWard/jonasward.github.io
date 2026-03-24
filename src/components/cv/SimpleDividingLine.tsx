export const SimpleDividingLine: React.FC<{ paddingTop?: number }> = ({ paddingTop }) => (
  <>
    <div id={'aboveLine'} style={{ height: paddingTop ? paddingTop : '7px' }} />
    <div id={'line'} style={{ height: '0.5px', backgroundColor: '#999999' }} />
    <div id={'underneathLine'} style={{ height: '7px' }} />
  </>
);
