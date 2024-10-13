import { View } from '@react-pdf/renderer';
import { styles } from './CVDocument';
import { NamedListRenderer } from './NamedListRenderer';
import { TitleRenderer } from './TitleRenderer';

export const ExtraCurricularRenderer: React.FC<{ data: { [key: string]: string }; isPdf: boolean }> = ({ data, isPdf }) => (
  <View wrap={false} id={'experience'} style={styles.block}>
    <TitleRenderer title={'Extra Curricular'} isPdf={isPdf} />
    <NamedListRenderer data={data} isPdf={isPdf} />
  </View>
);
