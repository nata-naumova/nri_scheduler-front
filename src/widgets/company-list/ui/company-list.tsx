import { Tabs, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import { $checkboxState, toggleCheckbox } from '@/shared/store/checkboxStore';
import { useMyCompanies } from '@/features/company-list/model/useMyCompanies';
import { EAbortReason } from '@/shared/api/types';

import { EmptyList } from '@/widgets/empty-list';
import { PROFILE_TABS, PROFILE_TEXTS } from '@/widgets/profile-tabs/model/profile.data';
import { CompList } from '@/widgets/complist/complist';

export const CompanyList = () => {
  const [, , COMPLIST_TAB] = PROFILE_TABS;
  const { companyView } = useStore($checkboxState);
  const { companies, loading, load } = useMyCompanies();

  useEffect(() => {
    const abortController = new AbortController();
    load(abortController);

    return () => abortController.abort(EAbortReason.UNMOUNT);
  }, []);

  return (
    <Tabs.Content value={COMPLIST_TAB.id}>
      {loading ? (
        <Spinner size="sm" />
      ) : companies.length ? (
        <CompList
          list={companies}
          isChecked={companyView}
          toggleCheckbox={() => toggleCheckbox('companyView')}
        />
      ) : (
        <EmptyList title={PROFILE_TEXTS.emptyStates.companies.title} />
      )}
    </Tabs.Content>
  );
};
