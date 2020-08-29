import React from 'react';
import './style.scss';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from 'store';
import { fetchingStatusesSelectors } from 'store/fetchingStatusesSlice';
import { fetchingStatuses } from 'utils/constants';
import { noop } from 'lodash';

interface BlockUIProps {
  // default to true
  renderChildren?: boolean;
  message?: string | JSX.Element;
  blocking?: boolean;
  blockingAction?: AsyncThunk<any, any, any>;
  blockingActions?: AsyncThunk<any, any, any>[];
  idleHandler?: boolean;
}

export const BlockUI: React.FC<BlockUIProps> = (props) => {
  const {
    children,
    renderChildren,
    message,
    blocking,
    blockingAction,
    blockingActions = [],
    idleHandler,
  } = props;

  const fetchingStatusesState = useAppSelector(
    fetchingStatusesSelectors.selectState
  );

  const actionFetchingStatus = fetchingStatusesState[blockingAction.typePrefix];

  const blockingActionsMappedToBoolean = blockingActions.map((action) => {
    if (idleHandler) {
      return (
        fetchingStatusesState[action.typePrefix] === fetchingStatuses.pending ||
        fetchingStatusesState[action.typePrefix] === fetchingStatuses.idle
      );
    }
    return (
      fetchingStatusesState[action.typePrefix] === fetchingStatuses.pending
    );
  });

  const isBlocking =
    blockingActionsMappedToBoolean.includes(true) ||
    blocking ||
    actionFetchingStatus === fetchingStatuses.pending;

  return (
    <div className="block-ui">
      {(renderChildren || !isBlocking) && children}
      {isBlocking && (
        <div className="block-ui-container" tabIndex={0}>
          <div className="block-ui-overlay second-common-bg-color" />
          <div className="block-ui-message-container">
            <div className="block-ui-message">
              {message}
              <Spinner />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BlockUI.defaultProps = {
  renderChildren: true,
  blocking: false,
  blockingAction: noop as AsyncThunk<any, any, any>,
};

const Spinner = () => {
  return (
    <div className="loading-indicator">
      <span className="loading-bullet">&bull;</span>{' '}
      <span className="loading-bullet">&bull;</span>{' '}
      <span className="loading-bullet">&bull;</span>
    </div>
  );
};
