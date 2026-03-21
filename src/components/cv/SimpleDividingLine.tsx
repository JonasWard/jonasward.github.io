export const SimpleDividingLine: React.FC<{ paddingTop?: number }> = ({ paddingTop }) => (
  <>
    <div id={'aboveLine'} style={{ height: paddingTop ? paddingTop : '7px' }} />
    <div id={'line'} style={{ height: '1px', backgroundColor: '#000000' }} />
    <div id={'underneathLine'} style={{ height: '7px' }} />
  </>
);
