import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { Alert } from 'react-native';

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

import { NavigationParamsChapterForm } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IChapterData } from 'src/types/chapter.type';
import { ThunkDispatch } from '../types/redux.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapterForm>;
  dispatch: ThunkDispatch;
}

class ChapterFormScreen extends React.Component<IProps> {
  static navigationOptions = ({
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

  componentDidMount(): void {
    const { navigation } = this.props;
    const chapter = navigation.getParam('chapter');

    if (chapter) {
      navigation.setParams({
        onConfirmDeletion: this.handleConfirmDeletion,
      });
    }
  }

  handleDelete = async () => {
    const { navigation, dispatch } = this.props;

    try {
      await dispatch(deleteChapter(navigation.getParam('chapter').id));
      navigation.pop(2);
    } catch (error) {
      console.warn(error);
    }
  };

  handleConfirmDeletion = () => {
    Alert.alert(
      'Heads up!',
      'Are you sure you want to delete this chapter and its content?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          onPress: this.handleDelete,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  handleSubmit = async (values: FormValues) => {
    const { navigation, dispatch } = this.props;
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
  };

  renderContent() {
    const { navigation } = this.props;
    const chapter = navigation.getParam('chapter');

    return (
      <Form
        fields={getChapterFormFields(chapter)}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    return <Screen scrollable>{this.renderContent()}</Screen>;
  }
}

export default connect()(ChapterFormScreen);
