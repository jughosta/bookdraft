import { Alert } from 'react-native';

type Callback = () => void;

export function confirmDeletion(
  entityLabel: string,
  onConfirmed: Callback,
): Callback {
  return function() {
    Alert.alert(
      'Heads up!',
      `Are you sure you want to delete this ${entityLabel}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onConfirmed,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };
}
