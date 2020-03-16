import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';

import {
  createChapterItem,
  deleteChapterItem,
  editChapterItem,
} from '../reducers/chapterItemSlice';

import { getChapterItemFormFields } from '../utils/form';
import { confirmDeletion } from '../utils/alerts';

import { FormValues } from '../types/form.type';
import { ChapterItemState, IChapterItemData } from 'src/types/chapterItem.type';
import { ThunkDispatch } from '../types/redux.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChapterItemFormScreen'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ChapterItemFormScreen'>;

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
  const chapterItemId = (route.params.chapterItem || {}).id;
  const chapterItemData: IChapterItemData = {
    content: values.content,
    state: values.state as ChapterItemState,
    chapterId: route.params.chapterId,
  };

  try {
    if (chapterItemId) {
      await dispatch(editChapterItem(chapterItemId, chapterItemData));
    } else {
      await dispatch(createChapterItem(chapterItemData));
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
    const chapterItemId = (route.params.chapterItem || {}).id;

    if (chapterItemId) {
      await dispatch(deleteChapterItem(chapterItemId));
    }
    navigation.goBack();
  } catch (error) {
    console.warn(error);
  }
}

const ChapterItemFormScreen = ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();
  const chapterItem = route.params.chapterItem;

  useEffect(() => {
    if (chapterItem) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('scene', () =>
          handleDelete(navigation, route, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen scrollable>
      <Form
        fields={getChapterItemFormFields(chapterItem)}
        onSubmit={values => handleSubmit(values, navigation, route, dispatch)}
      />
    </Screen>
  );
};

export default ChapterItemFormScreen;
