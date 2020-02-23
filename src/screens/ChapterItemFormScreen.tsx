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
  createChapterItem,
  deleteChapterItem,
  editChapterItem,
} from '../reducers/chapterItemSlice';

import { getChapterItemFormFields } from '../utils/form';
import { Palette } from '../utils/theme';
import { confirmDeletion } from '../utils/alerts';

import { NavigationParamsChapterItemForm } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { ChapterItemState, IChapterItemData } from 'src/types/chapterItem.type';
import { ThunkDispatch } from '../types/redux.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapterItemForm>;
}

async function handleSubmit(
  values: FormValues,
  navigation: NavigationStackProp<NavigationParamsChapterItemForm>,
  dispatch: ThunkDispatch,
) {
  const chapterItemId = navigation.getParam('chapterItem', {}).id;
  const chapterItemData: IChapterItemData = {
    content: values.content,
    state: values.state as ChapterItemState,
    chapterId: navigation.getParam('chapterId'),
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
  navigation: NavigationStackProp<NavigationParamsChapterItemForm>,
  dispatch: ThunkDispatch,
) {
  try {
    await dispatch(deleteChapterItem(navigation.getParam('chapterItem').id));
    navigation.goBack();
  } catch (error) {
    console.warn(error);
  }
}

const ChapterItemFormScreen = ({ navigation }: IProps) => {
  const dispatch = useDispatch();
  const chapterItem = navigation.getParam('chapterItem');

  useEffect(() => {
    if (chapterItem) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('scene', () =>
          handleDelete(navigation, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen scrollable>
      <Form
        fields={getChapterItemFormFields(chapterItem)}
        onSubmit={values => handleSubmit(values, navigation, dispatch)}
      />
    </Screen>
  );
};

ChapterItemFormScreen.navigationOptions = ({
  navigation,
}: NavigationStackScreenProps<NavigationParamsChapterItemForm>) => {
  return {
    title: navigation.getParam('chapterItem') ? 'Scene' : 'New scene',
    headerRight: () =>
      navigation.getParam('chapterItem') ? (
        <Touchable onPress={navigation.getParam('onConfirmDeletion')}>
          <IconTrash fillColor={Palette.gray.v900} size={20} />
        </Touchable>
      ) : null,
  };
};

export default ChapterItemFormScreen;
