import Body from '@/components/layout/containers/Body';
import Content from '@/components/layout/containers/Content';
import Header from '@/components/layout/containers/Header';

const Drafts = () => {
  return (
    <Content>
      <Header>
        <h3 className="text-lg leading-6 font-medium">Drafts</h3>
      </Header>
      <Body>
        <p>Content</p>
      </Body>
    </Content>
  );
};

export default Drafts;
