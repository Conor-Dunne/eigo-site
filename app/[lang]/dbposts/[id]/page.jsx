import TabsBar from "../components/TabsBar";
import getData from "../helpers/getData";
import getFormattedDate from "@/lib/getFormattedDate";
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'


const SinglePage = async ({ params }) => {
  const { id, lang } = params;
  const { page } = await getDictionary(lang)
  const data = await getData(id);
  const formattedDate = getFormattedDate(data.createdAt);



  return (
    <main className="prose prose-slate text-lg mx-auto mt-10 md:mt-20 px-6 pb-28 min-w-[260px]">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
          {data.title}
        </h1>
        <p className="text-sm text-gray-600 m-0">{formattedDate}</p>
      </div>
      <TabsBar data={data} tabNames={page.tabsBarNames} />
    </main>
  );
};

export default SinglePage;
