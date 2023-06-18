import { ProjectImageData } from '../projectsData/ProjectData';

export interface IProjectImages {
  id: string;
  images: ProjectImageData[];
}

export const ProjectImages: React.FC<IProjectImages> = ({ id, images }) => {
  return (
    <div id={id}>
      {images.map((image) => (
        <div>
          <img src={image.image} alt={'red dot'} />
          {image.title && <h2>{image.title}</h2>}
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};
