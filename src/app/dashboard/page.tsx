import Link from "next/link";
import {
  FaBook,
  FaCogs,
  FaLanguage,
  FaListAlt,
  FaPlus,
  FaUsers,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Lessons"
          description="View and manage existing lessons"
          link="/dashboard/lessons"
          icon={<FaBook className="text-2xl text-blue-600" />}
        />
        <DashboardCard
          title="Add Lessons"
          description="Add new lessons to the system"
          link="/dashboard/add-lessons"
          icon={<FaPlus className="text-2xl text-green-600" />}
        />
        <DashboardCard
          title="Add Vocabularies"
          description="Add new vocabulary items to lessons"
          link="/dashboard/add-vocabularies"
          icon={<FaLanguage className="text-2xl text-purple-600" />}
        />
        <DashboardCard
          title="Add Tutorials"
          description="Add new vocabulary items to lessons"
          link="/dashboard/add-tutorials"
          icon={<FaYoutube className="text-2xl text-red-600" />}
        />
        <DashboardCard
          title="Manage Users"
          description="Manage user roles and permissions"
          link="/dashboard/manage-users"
          icon={<FaUsers className="text-2xl text-indigo-600" />}
        />
        <DashboardCard
          title="Lesson Management"
          description="Oversee and manage all lessons"
          link="/dashboard/manage-lessons"
          icon={<FaCogs className="text-2xl text-gray-600" />}
        />
        <DashboardCard
          title="Vocabulary Management"
          description="Manage vocabulary sets for lessons"
          link="/dashboard/manage-vocabularies"
          icon={<FaListAlt className="text-2xl text-orange-600" />}
        />
        <DashboardCard
          title="Tutorials Management"
          description="Manage tutorials of embedded youtube videos"
          link="/dashboard/manage-tutorials"
          icon={<FaVideo className="text-2xl text-pink-600" />}
        />
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  description,
  link,
  icon,
}: {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={link}>
      <div className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg">
        <div className="mb-2 flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardPage;
