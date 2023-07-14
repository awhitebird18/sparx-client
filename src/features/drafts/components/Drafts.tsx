import Content from '@/components/layout/containers/Content';
import Header from '@/components/layout/containers/Header';

const Drafts = () => {
  return (
    <div className="w-full">
      <Header>
        <h3 className="text-lg leading-6 font-medium">Drafts</h3>
      </Header>
      <Content>
        <p>Content</p>
      </Content>
    </div>
  );
};

export default Drafts;
