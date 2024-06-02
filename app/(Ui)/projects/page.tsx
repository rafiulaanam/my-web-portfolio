import { TProject } from "@app/dashboard/projects/project/project";
import Card from "@components/Card";
import Typography from "@components/Typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Anam - Full Stack Developer",
};

async function getPersonalProjectData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  try {
    const res = await fetch(`${baseUrl}/api/project?tag=personal`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch project data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Additional check to ensure the response is valid JSON
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid JSON response');
    }

    return data;
  } catch (error) {
    console.error('Error fetching personal project data:', error);
    throw error;
  }
}

const Projects = async () => {
  let personalProjectsData: TProject[] = [];

  try {
    personalProjectsData = await getPersonalProjectData();
  } catch (error) {
    console.error('Failed to load personal projects:', error);
  }

  return (
    <main className="container">
      <div className="flex flex-col gap-2  my-12">
        <Typography size="h3/semi-bold" className="!text-3xl sm:text-4xl">
          Projects
        </Typography>
        <Typography size="body2/normal" variant="secondary">
          Projects I’ve worked on
        </Typography>
      </div>
      <span className="w-full block border border-primary-300 absolute right-0"></span>
      <div className="flex flex-col gap-4 my-4 mt-20">
        <Typography size="h5/semi-bold" variant="secondary">
          Personal
        </Typography>
        <div className="flex flex-col gap-8 mb-4 ">
          {personalProjectsData.length ? (
            personalProjectsData
              .sort(
                (a, b) =>
                  Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
              )
              .map((data) => (
                <Card
                  key={data._id}
                  title={data.title}
                  description={data.description}
                  actionLink={data.demoLink}
                  actionText="Visit Site"
                  secondaryActionLink={data.githubLink}
                  secondaryActiontext="Github"
                  projectLogoSrc={data.logo}
                  projectScreenshotSrc={data.thumbnail}
                  techUsed={data.techUsed}
                  variant="projectCard"
                />
              ))
          ) : (
            <Typography>No Data found</Typography>
          )}
        </div>

        <div className="flex flex-col gap-2 ">
          <Typography size="h5/semi-bold" variant="secondary">
            Professional
          </Typography>
          <Typography size="body2/normal" variant="secondary">
            *I have built some confidential projects for clients and Due to
            client confidentiality, I cannot reveal the projects I have built
            for them. However, I will share any public projects I create in the
            future.
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default Projects;
