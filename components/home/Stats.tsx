import Card from "@/components/Card";

const Stats = () => {
  return (
    <div className="sm:px-15 lg:mt-60">
      <h1 className="text-3xl text-center text-white font-primary mx-5 mt-27 mb-10 md:mb-1 md:text-4xl sm:text-4xl ">
        CATALYST MATRIX
      </h1>
      <div className="mx-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 md:p-9 sm:grid-cols-2 lg:grid-cols-3">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Stats;
