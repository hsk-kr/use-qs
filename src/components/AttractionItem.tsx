interface AttractionProps {
  url: string;
  country: string;
  title: string;
}

const AttractionItem = ({ url, country, title }: AttractionProps) => {
  return (
    <div className="search-page-result-card">
      <img src={url} alt="attraction image" />
      <div>
        <h5>{country}</h5>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default AttractionItem;
