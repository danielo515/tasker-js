import React from 'react';
import { TaskStatus } from '../../core/tasks';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const { PAUSED, RUNNING } = TaskStatus;

const ColorIcon = styled(IconButton)`
  && {
      color: ${({ color }) => color === 'iced' ? '#15dbffb3' : color === 'green' ? '#15ff36d1' : '#1584ffdb' };
    }
`;

const switcher = {
    [PAUSED]: ({ onPause }) => ({
        onClick: onPause,
        color: 'iced',
        'aria-label': 'resume',
        icon: <PlayIcon/>,
    }),
    [RUNNING]: ({ onPause  }) => ({
        onClick: onPause,
        color: 'blue',
        'aria-label': 'pause',
        icon: <PauseIcon/>,
    }),
    default: ({ onStart  }) => ({
        onClick: onStart,
        color: 'green',
        icon: <PlayIcon/>
    })
};

const PlayPause = ({ status, inline, ...props }) => {
    const { icon, ...rest } = (switcher[status] || switcher.default)(props);
    return <ColorIcon {...rest} style={inline ? { padding: 0 } : {}}>
        {icon}
    </ColorIcon>;
};

PlayPause.propTypes = {
    status: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onPause: PropTypes.func,
    inline: PropTypes.bool,
};


PlayPause.defaultProps = {
    inline: true,
};

export default PlayPause;