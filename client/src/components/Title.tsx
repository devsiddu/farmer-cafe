
interface Title {
  title: string;
}
const Title = ({ title }: { title: string }) => (
  <div className="my-10 inline-block">
    <h1 className="text-xl font-medium text-primary text-left">{title}</h1>
    <div className="mt-1 h-1 w-[70%] rounded-full bg-secondary transition-all duration-100"></div>
  </div>
);

export default Title;
