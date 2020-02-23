import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';
import Touchable from '../components/Touchable';
import IconTrash from '../icons/IconTrash';

import {
  createChapter,
  deleteChapter,
  editChapter,
} from '../reducers/chapterSlice';

import { getChapterFormFields } from '../utils/form';
import { Palette } from '../utils/theme';
import { confirmDeletion } from '../utils/alerts';

import { NavigationParamsChapterForm } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IChapterData } from 'src/types/chapter.type';
import { ThunkDispatch } from '../types/redux.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapterForm>;
}

async function handleSubmit(
  values: FormValues,
  navigation: NavigationStackProp<NavigationParamsChapterForm>,
  dispatch: ThunkDispatch,
) {
  const chapterId = navigation.getParam('chapter', {}).id;
  const chapterData: IChapterData = {
    title: values.title,
    bookId: navigation.getParam('bookId'),
  };

  try {
    if (chapterId) {
      await dispatch(editChapter(chapterId, chapterData));
    } else {
      await dispatch(createChapter(chapterData));
    }
    navigation.goBack();
  } catch (error) {
    console.warn(error);
  }
}

async function handleDelete(
  navigation: NavigationStackProp<NavigationParamsChapterForm>,
  dispatch: ThunkDispatch,
) {
  try {
    await dispatch(deleteChapter(navigation.getParam('chapter').id));
    navigation.pop(2);
  } catch (error) {
    console.warn(error);
  }
}

const ChapterFormScreen = ({ navigation }: IProps) => {
  const dispatch = useDispatch();
  const chapter = navigation.getParam('chapter');

  useEffect(() => {
    if (chapter) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('chapter and its content', () =>
          handleDelete(navigation, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen scrollable>
      <Form
        fields={getChapterFormFields(chapter)}
        onSubmit={values => handleSubmit(values, navigation, dispatch)}
      />
    </Screen>
  );
};

ChapterFormScreen.navigationOptions = ({
  navigation,
}: NavigationStackScreenProps<NavigationParamsChapterForm>) => {
  return {
    title: navigation.getParam('chapter') ? 'Chapter details' : 'New chapter',
    headerRight: () =>
      navigation.getParam('chapter') ? (
        <Touchable onPress={navigation.getParam('onConfirmDeletion')}>
          <IconTrash fillColor={Palette.gray.v900} size={20} />
        </Touchable>
      ) : null,
  };
};

export default ChapterFormScreen;
