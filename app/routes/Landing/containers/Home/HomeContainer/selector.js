import { createSelector } from 'utils/reselect';

const serialSelector = state => state.getIn(['app', 'serialnumber']);

export default createSelector(serialSelector, serialnumber => ({ serialnumber }));
