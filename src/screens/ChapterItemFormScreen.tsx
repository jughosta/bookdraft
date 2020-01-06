import React from 'react';
import { connect } from 'react-redux';
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
  dispatch: ThunkDispatch;
}

class ChapterItemFormScreen extends React.Component<IProps> {
  static navigationOptions = ({
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

  componentDidMount(): void {
    const { navigation } = this.props;
    const chapterItem = navigation.getParam('chapterItem');

    if (chapterItem) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('scene', this.handleDelete),
      });
    }
  }

  handleDelete = async () => {
    const { navigation, dispatch } = this.props;

    try {
      await dispatch(deleteChapterItem(navigation.getParam('chapterItem').id));
      navigation.goBack();
    } catch (error) {
      console.warn(error);
    }
  };

  handleSubmit = async (values: FormValues) => {
    const { navigation, dispatch } = this.props;
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
  };

  renderContent() {
    const { navigation } = this.props;
    const chapterItem = navigation.getParam('chapterItem');

    return (
      <Form
        fields={getChapterItemFormFields(chapterItem)}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    return <Screen scrollable>{this.renderContent()}</Screen>;
  }
}

export default connect()(ChapterItemFormScreen);
