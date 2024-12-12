import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Lessons"
          description="View and manage existing lessons"
          link="/dashboard/lessons"
        />
        <DashboardCard
          title="Add Lessons"
          description="Add new lessons to the system"
          link="/dashboard/add-lessons"
        />
        <DashboardCard
          title="Add Vocabularies"
          description="Add new vocabulary items to lessons"
          link="/dashboard/add-vocabularies"
        />
        <DashboardCard
          title="Add Tutorials"
          description="Add new vocabulary items to lessons"
          link="/dashboard/add-tutorials"
        />
        <DashboardCard
          title="Manage Users"
          description="Manage user roles and permissions"
          link="/dashboard/manage-users"
        />
        <DashboardCard
          title="Lesson Management"
          description="Oversee and manage all lessons"
          link="/dashboard/manage-lessons"
        />
        <DashboardCard
          title="Vocabulary Management"
          description="Manage vocabulary sets for lessons"
          link="/dashboard/manage-vocabularies"
        />
        <DashboardCard
          title="Tutorials Management"
          description="Manage tutorials of embedded youtube videos"
          link="/dashboard/manage-tutorials"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardPage;
