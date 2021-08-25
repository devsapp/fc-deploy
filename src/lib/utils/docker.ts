import Docker from 'dockerode';

const docker: any = new Docker();

export async function imageExist(imageName: string): Promise<boolean> {
  const images: any[] = await docker.listImages({
    filters: {
      reference: [imageName],
    },
  });

  return images.length > 0;
}

