import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const OUR_VALUES: Statistic[] = [
  {
    id: "1",
    heading: "Innovative",
    subHeading:
      "Tickets4Travel, is always promising to find innovative solutions.",
  },
  {
    id: "2",
    heading: "We care about safety",
    subHeading: "Tickets4Travel, is always promising to find innovative solutions. ",
  },
  {
    id: "3",
    heading: "We believe in service",
    subHeading:
      "Tickets4Travel, is always promising to find innovative solutions. ",
  },
];


const SectionOurValues = () => {
  return (
    <div className={`nc-SectionStatistic relative`}>
      <Heading
        desc=""
      >
        🚀 Our Values
      </Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {OUR_VALUES.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOurValues;
