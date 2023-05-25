
import React from 'react';
import classNames from 'classnames';
import { Editor } from '@firefly/auto-editor-core';
import { IconEdit } from './IconEdit';
import { IconSave } from './IconSave';
import { IconSeed } from './IconSeed';
import { chatgptConnect } from '../api';
import './index.less';
import { Input } from 'antd';

const { TextArea } = Input;


export interface PluginProps {
    editor: Editor;
}

interface ComponentPaneProps extends PluginProps {
    [key: string]: any;
}

interface ComponentPaneState {
    showKeyInput: boolean;
    chatgptKey: string;
}

export default class ChatgptPane extends React.Component<ComponentPaneProps, ComponentPaneState> {
    static displayName = 'AutoChatgptPane';
    constructor(props: ComponentPaneProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        showKeyInput: false,
        chatgptKey: '',
    };

    async toggle() {
      // chatgptConnect
      const { showKeyInput } = this.state;
      if (showKeyInput) {
        const res = await chatgptConnect();
      }
      this.setState((prevState) => ({ showKeyInput: !prevState.showKeyInput }));
    }

    render() {
        const { showKeyInput } = this.state;
        return (
          <div className={classNames('auto-component-panel')}>
            <div className={classNames('edit-box')}>
              <span onClick={this.toggle}>
                {showKeyInput ? IconSave({}) : IconEdit({
                    style: {
                        color: '',
                    },
                })}
              </span>
              {
                showKeyInput ? <Input className={classNames('edit-input')} value={this.state.chatgptKey} /> : null
              }
            </div>
            <div className={classNames('send-box')}>
              <TextArea className={classNames('send-input')} autoSize bordered={false} />
              <button className={classNames('send-btn')}>
                {IconSeed({})}
              </button>
            </div>
          </div>
        );
    }
}