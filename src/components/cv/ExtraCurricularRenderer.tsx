import { View } from '@react-pdf/renderer';
import { REACT_PDF_STYLES } from './style';
import { NamedListRenderer } from './NamedListRenderer';
import { TitleRenderer } from './TitleRenderer';
import { CVData } from 'src/types/cv/cvType';

export const ExtraCurricularRenderer: React.FC<{ data: CVData['extraCurricular']; isPdf: boolean }> = ({ data, isPdf }) => (
  <View wrap={false} id={'experience'} style={REACT_PDF_STYLES.block}>
    <TitleRenderer title={'Extra Curricular'} isPdf={isPdf} />
    <NamedListRenderer data={data} isPdf={isPdf} />
  </View>
);
