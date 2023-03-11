import { useRef, useState } from 'react';
import useAttractions, { COUNTRY_CODE_FILTER } from '../hooks/useAttractions';
import useSearchParam from '../hooks/useSearchParam';
import AttractionItem from './AttractionItem';
import './SearchPage.css';

const SearchPage = () => {
  const [country, setCountry] = useSearchParam<COUNTRY_CODE_FILTER>({
    key: 'country',
    defaultValue: 'all',
  });
  const [keyword, setKeyword] = useSearchParam<string>({
    key: 'keyword',
    defaultValue: '',
  });

  const [countryOptions] = useState<
    {
      label: string;
      country: COUNTRY_CODE_FILTER;
    }[]
  >([
    { label: 'ALL', country: 'all' },
    { label: 'South Korea', country: 'kr' },
    { label: 'Germany', country: 'de' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useAttractions({
    country,
    keyword,
  });

  const search = () => {
    if (!inputRef.current) {
      console.error('inputRef.current is not defined', inputRef);
      return;
    }

    setKeyword(inputRef.current.value);
  };

  const handleCountryChange = (country: COUNTRY_CODE_FILTER) => () => {
    setCountry(country);
  };

  const handleEnter =
    (callback: VoidFunction): React.KeyboardEventHandler<HTMLInputElement> =>
    (e) => {
      if (e.code === 'Enter') callback();
    };

  return (
    <div className="search-page">
      <h1>Attractions</h1>
      <div className="search-page-tool">
        <input
          type="text"
          ref={inputRef}
          onKeyUp={handleEnter(search)}
          defaultValue={keyword}
        />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <ul className="search-page-filters">
        {countryOptions.map((option) => (
          <li
            key={option.country}
            className={country === option.country ? 'active' : ''}
            onClick={handleCountryChange(option.country)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <div className="search-page-result">
        {data?.map((d) => (
          <AttractionItem key={d.id} {...d} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
