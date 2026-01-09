import SearchLayout from '../SearchLayout';
import SearchTabs from '@/components/search/containers/SearchTab';
import '../../../styles/search/search.scss';

interface props {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function Page({ searchParams }: props) {
  const { type } = await searchParams;

  return (
    <SearchLayout>
      <SearchTabs type={type} />
    </SearchLayout>
  );
}