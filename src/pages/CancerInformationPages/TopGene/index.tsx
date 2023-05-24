import {
  mutationBreast20GeneEp,
  mutationColorectal20GeneEp,
  mutationLiver20GeneEp,
  mutationLung20GeneEp,
  mutationThyroid20GeneEp,
} from '@/pages/EndPoint';
import { Column } from '@ant-design/charts';
import { useEffect, useState } from 'react';

const lungCancerPage = '/cancer/lung-cancer/overview';
const liverCancerPage = '/cancer/liver-cancer/overview';
const breastCancerPage = '/cancer/breast-cancer/overview';
const thyroidCancerPage = '/cancer/thyroid-cancer/overview';
const colorectalCancerPage = '/cancer/colorectal-cancer/overview';

const TopGene = () => {
  const [data, setData] = useState([]);

  let URL = '';

  switch (location.pathname) {
    case lungCancerPage:
      URL = mutationLung20GeneEp;
      break;
    case liverCancerPage:
      URL = mutationLiver20GeneEp;
      break;
    case breastCancerPage:
      URL = mutationBreast20GeneEp;
      break;
    case thyroidCancerPage:
      URL = mutationThyroid20GeneEp;
      break;
    case colorectalCancerPage:
      URL = mutationColorectal20GeneEp;
      break;
    default:
      URL = '';
      break;
  }
  
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  console.log(data);
  const config = {
    data,
    xField: 'gene_name',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [5, 5, 0, 0],
    },
  };
  return (
    <div style={{ height: '80vh' }}>
      <Column {...config}/>
    </div>
  );
};

export default TopGene;
