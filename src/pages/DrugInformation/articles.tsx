import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';


const articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dataArticles, setDataArticles] = useState<Array<{
    gene: any,
    cancerType: any,
    level: any,
    alteration: any,
    drug: any,
    key: any,
    title: any,
    journal: any,
    pubDate: any,
    volume: any,
    issue: any,
    authors: any,
    elocationId: any,
    reference: any,
    link: any,
    abstract: any,
    page: Number,
  }>>([]);

  const currentLocation = location.pathname;
  const id = currentLocation.replace('/drug/','');

  const fetchDataArticles = async (id: any) => {
    const response = await fetch(`http://localhost:3000/drugs-information/find/${id}`);
    const data = await response.json();
    const articles = data.articles.map((article: any) => {
      return {
        gene: data.gene,
        cancerType: data.cancer_main_type,
        level: data.level,
        alteration: data.alteration,
        drug: data.drug,
        key: article.pmid,
        title: article.title,
        journal: article.journal,
        pubDate: article.pubDate,
        volume: article.volume,
        issue: article.issue,
        authors: article.authors,
        elocationId: article.eloctionId,
        reference: article.reference,
        link: article.link || null,
        abstract: article.abstract,
        pages: article.pages,
      };
    });
    setDataArticles(articles);  
  };

  useEffect(() => {
    fetchDataArticles(id).catch((error) => console.error(error));
  }, []);

  console.log(dataArticles);  

  const columns: ProColumns[] = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tạp chí',
      dataIndex: 'journal',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'pubDate',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Số',
      dataIndex: 'issue',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Trang',
      dataIndex: 'pages',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tác giả',
      dataIndex: 'authors',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Tham chiếu',
      dataIndex: 'reference',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      hideInSearch: true,
      align: 'center',
      render: (text, dataArticles) => (
        dataArticles.link ? <a href={dataArticles.link .toString()} style={{textDecoration: 'underline'}} target='_blank'>Xem</a> 
        : <a href={`https://pubmed.ncbi.nlm.nih.gov/${dataArticles.key}`} style={{textDecoration: 'underline'}} target='_blank'>Xem</a>
      ),
    },
    {
      title: 'Tóm tắt',
      dataIndex: 'abstract',
      hideInSearch: true,
      align: 'center',
    },
  ];


  return (
    <>
      <Descriptions title="Thông tin cơ bản">
        <Descriptions.Item label="Gene">{dataArticles[0]?.gene}</Descriptions.Item>
        <Descriptions.Item label="Đột biến">{dataArticles[0]?.alteration}</Descriptions.Item>
        <Descriptions.Item label="Loại ung thư">{dataArticles[0]?.cancerType}</Descriptions.Item>
        <Descriptions.Item label="Thuốc">{dataArticles[0]?.drug}</Descriptions.Item>
        <Descriptions.Item label="Level">{dataArticles[0]?.level}</Descriptions.Item>
      </Descriptions>

      <ProTable
        columns={columns}
        dataSource={dataArticles}
        toolbar={{
          title: 'CÁC BÀI BÁO LIÊN QUAN',
          settings: [],
        }}
        rowKey="key"
        search={false}
        pagination={{ pageSize: 10 }}
      />
    </>
    
  );
};

export default articles;
