
import React from 'react';
import classNames from 'classnames';

interface Props {
    data: any;
}

interface State {
    icon: string | React.ReactNode;
    snippet: any;
}

export default class Component extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        const { data } = props;
        const { icon, snippets = [] } = data;
        const snippet = snippets[0];
        const screenshot = snippet?.screenshot ?? icon;

        return {
          icon: screenshot,
          snippet,
        };
    }

    state = {
        icon: '',
        snippet: null,
    };

    render() {
        const { data } = this.props;
        const { title } = data;
        const { snippet } = this.state;

        return (
          <div className={classNames('snippet card')} data-id={snippet.id} title={title}>
            <div className={classNames('icon')}>{this.state.icon}</div>
            <div className={classNames('name')}>{title}</div>
          </div>
        );
    }
}