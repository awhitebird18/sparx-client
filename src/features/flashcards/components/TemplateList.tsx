import { observer } from 'mobx-react-lite';
import TemplateTableHeader from './TemplateTableHeader';
import VariantTableHeader from './VariantTableHeader';
import TemplateTable from './TemplateTable';
import VariantTable from './VariantTable';

const TemplateList = observer(() => {
  return (
    <div className="flex flex-col gap-12 p-4">
      <div className="space-y-4">
        <TemplateTableHeader />
        <TemplateTable />
      </div>
      <div className="space-y-4">
        <VariantTableHeader />
        <VariantTable />
      </div>
    </div>
  );
});

export default TemplateList;
