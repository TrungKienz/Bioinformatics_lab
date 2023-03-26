import { Column } from '@ant-design/charts';
import { useEffect, useState } from 'react';
import { mutationLungGeneEp, mutationLiverGeneEp, mutationBreastGeneEp, mutationThyroidGeneEp, mutationColorectalEp } from '@/pages/EndPoint';

const lungCancerPage = '/cancer/lung-cancer';
const liverCancerPage = '/cancer/liver-cancer';
const breastCancerPage = '/cancer/breast-cancer';
const thyroidCancerPage = '/cancer/thyroid-cancer';
const colorectalCancerPage = '/cancer/colorectal-cancer';
  
interface DataObject {
  gene_name: string;
  value: number;
  type: string;
}

const TopGene = () => {
  const [dataTopGene, setDataTopGene] = useState<DataObject[]>([]);

  let URL = '';

  if (location.pathname === lungCancerPage) {
    URL = mutationLungGeneEp;
  } else if (location.pathname === liverCancerPage) {
    URL = mutationLiverGeneEp;
  } else if (location.pathname === breastCancerPage) {
    URL = mutationBreastGeneEp;
  } else if (location.pathname === thyroidCancerPage) {
    URL = mutationThyroidGeneEp;
  } else if (location.pathname === colorectalCancerPage) {
    URL = mutationColorectalEp;
  } else {
    URL = '';
  }
  
  const asyncFetch = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const top20MutatedSamples = data
        .sort((a: any, b: any) => b.mutated_samples - a.mutated_samples)
        .slice(0, 20)
        .map((obj: any) => ({
          gene_name: obj.gene_name,
          mutated_samples: obj.mutated_samples,
          samples_tested: obj.samples_tested,
        }));

        // Remove duplicates
        const uniqueTop20MutatedSamples = Array.from(new Set(top20MutatedSamples.map((obj: any) => JSON.stringify(obj))))
        .map(str => JSON.parse(String(str)));
        
        return uniqueTop20MutatedSamples;
      } catch (error) {
        console.error(error);
        return []; // return an empty array if there's an error
      }
    };

    useEffect(() => {
      asyncFetch()
        .then(myArray => {
          const newData = [];
          for (let i = 0; i < myArray.length; i++) {
            let currentObject = myArray[i];
            const newDataObject1 = {
              gene_name: currentObject.gene_name,
              value: currentObject.mutated_samples,
              type: 'mutated_samples',
            };
            const newDataObject2 = {
              gene_name: currentObject.gene_name,
              value: currentObject.samples_tested,
              type: 'samples_tested',
            };
            newData.push(newDataObject1, newDataObject2); 
          }
          setDataTopGene(newData);
        })
        .catch(error => console.error(error));
    }, []);

    const config = {
      data: dataTopGene.map(dataTopGene => ({ x: dataTopGene.gene_name, y: dataTopGene.value, type: dataTopGene.type })),
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      isGroup: true,
      columnStyle: {
      radius: [5, 5, 0, 0],
    },
  };
  return <Column {...config} />;
};

export default TopGene;
