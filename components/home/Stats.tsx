import Card from "@/components/Card";

const Stats = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-white font-primary mx-5 mt-27 mb-10">
        CATALYST MATRIX
      </h1>
      <div className="mx-8 grid grid-cols-1 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Stats;
