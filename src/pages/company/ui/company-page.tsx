import { useForm } from 'react-hook-form';

import {
  Button,
  Container,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Field } from '@/shared/ui/field';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IEventStyle, navBack } from '@/shared/utils';
import { NotFoundPage } from '@/pages/not-found/ui/not-found';
import { IApiCompany } from '@/entities/company/api/types';
import { CompanyCardSkeleton } from './company-card.skeleton';
import { CompanyCard } from './company-card';

interface CompanyFormValues extends IApiCompany {
  style: IEventStyle;
}

export const CompanyPage = () => {
  const route = useNavigate();
  const companyId = 1;
  const [fetching, setFetching] = useState(false);
  // const [company, setCompany] = useState<IApiCompanyInfo | null>(null);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>();

  const company = {
    id: 1,
    master: 1,
    name: 'Мерри Поппинс',
    master_name: 'Мастер Игорек',
    system: 'merry-poppins',
    description: 'Описание кампании Мерри Поппинс',
    cover_link: 'cover_link',
    you_are_master: false,
    event_style: null,
  };

  // const onSubmit = handleSubmit((companyData) => {
  //   if (companyId) {
  //     const { name, system, description, style } = companyData;
  //     const eventStyle = stringifyEventStyle(style);
  //     setFetching(true);
  //     updateCompany(companyId, {
  //       name,
  //       system,
  //       description,
  //       event_style: eventStyle,
  //     })
  //       .then((res) => {
  //         if (res !== null) {
  //           setOpen(false);
  //         }
  //       })
  //       .then(() => readCompanyById(companyId))
  //       .then((res) => {
  //         if (res !== null) {
  //           const result = res.payload;
  //           setCompany(result);
  //         }
  //       })
  //       .finally(() => {
  //         setFetching(false);
  //       });
  //   }
  // });

  // useEffect(() => {
  //   const onEscClose = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       setOpen(false);
  //     }
  //   };
  //   document.addEventListener('keydown', onEscClose, { passive: true });

  //   if (companyId) {
  //     setFetching(true);
  //     readCompanyById(companyId)
  //       .then((res) => {
  //         if (res !== null) {
  //           const companyData = res.payload;
  //           setCompany(res.payload);
  //           reset({
  //             name: companyData.name,
  //             system: companyData.system,
  //             description: companyData.description,
  //             style: companyData.event_style
  //               ? parseEventStyle(companyData.event_style)
  //               : DEFAULT_EVENT_STYLE,
  //           });
  //         }
  //       })
  //       .finally(() => {
  //         setFetching(false);
  //       });
  //   }
  //   return () => {
  //     document.removeEventListener('keydown', onEscClose);
  //   };
  // }, [companyId, reset]);

  return (
    <Container>
      <Button mb={4} onClick={navBack}>
        Вернуться назад
      </Button>
      {company?.you_are_master && (
        <HStack alignItems="top">
          <DrawerRoot
            open={open}
            onOpenChange={(e) => {
              setOpen(e.open);
            }}
          >
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Button colorPalette="cyan" mt="4" mb="4" variant="solid">
                Редактировать кампанию
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Редактирование кампании</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <form onSubmit={onSubmit}>
                  <HStack>
                    <Separator flex="1" />
                    <Text flexShrink="0">Данные</Text>
                    <Separator flex="1" />
                  </HStack>
                  <Stack gap="4" align="flex-start" maxW="lg" w="full" mx="auto">
                    <Field
                      label="Название *"
                      errorText={errors.name?.message}
                      invalid={!!errors.name?.message}
                    >
                      <Input
                        placeholder="Заполните поле"
                        {...register('name', {
                          required: 'Заполните поле',
                        })}
                      />
                    </Field>
                    <Field
                      label="Система *"
                      errorText={errors.system?.message}
                      invalid={!!errors.system?.message}
                    >
                      <Input
                        placeholder="Заполните поле"
                        {...register('system', {
                          required: 'Заполните поле',
                        })}
                      />
                    </Field>
                    <Field label="Описание">
                      <Textarea
                        placeholder="Расскажите о своей кампании"
                        {...register('description')}
                      />
                    </Field>
                  </Stack>

                  <Stack gap={2}>
                    <HStack mt={2}>
                      <Separator flex="1" />
                      <Text flexShrink="0">Оформление</Text>
                      <Separator flex="1" />
                    </HStack>
                    <PreviewCompany control={control} value={watch('name')} />
                  </Stack>

                  <Button type="submit" w="full" mt={4}>
                    Редактировать
                  </Button>
                  <DrawerTrigger asChild>
                    <Button type="button" variant="subtle" w="full" mt={2}>
                      Отмена
                    </Button>
                  </DrawerTrigger>
                </form>
              </DrawerBody>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        </HStack>
      )}
      <Image height={200} width="100%" src="/assets/company_cover.webp" alt="Обложка кампании" />
      {fetching ? <CompanyCardSkeleton /> : <CompanyCard company={company} />}

      {/* <NotFoundPage checkButton={false} title="Кампания не найдена, попробуйте еще раз!" /> */}
    </Container>
  );
};
