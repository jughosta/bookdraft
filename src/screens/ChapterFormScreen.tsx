import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';

import {
  createChapter,
  deleteChapter,
  editChapter,
} from '../reducers/chapterSlice';

import { getChapterFormFields } from '../utils/form';
import { confirmDeletion } from '../utils/alerts';

import { RootStackParamList } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IChapterData } from 'src/types/chapter.type';
import { ThunkDispatch } from '../types/redux.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChapterFormScreen'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ChapterFormScreen'>;

interface IProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

async function handleSubmit(
  values: FormValues,
  navigation: ScreenNavigationProp,
  route: ScreenRouteProp,
  dispatch: ThunkDispatch,
) {
  const chapterId = (route.params.chapter || {}).id;
  const chapterData: IChapterData = {
    title: values.title,
    bookId: route.params.bookId,
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
  navigation: ScreenNavigationProp,
  route: ScreenRouteProp,
  dispatch: ThunkDispatch,
) {
  try {
    const chapterId = (route.params.chapter || {}).id;

    if (chapterId) {
      await dispatch(deleteChapter(chapterId));
    }
    navigation.pop(2);
  } catch (error) {
    console.warn(error);
  }
}

const ChapterFormScreen = ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();
  const chapter = route.params.chapter;

  useEffect(() => {
    if (chapter) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('chapter and its content', () =>
          handleDelete(navigation, route, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen scrollable>
      <Form
        fields={getChapterFormFields(chapter)}
        onSubmit={values => handleSubmit(values, navigation, route, dispatch)}
      />
    </Screen>
  );
};

export default ChapterFormScreen;
