import * as React from 'react';

export interface INavigationButtonsProps {
  onDashboard: () => void;
  onBack?: () => void;
  backLabel?: string;
  className?: string;
}

export default class NavigationButtons
  extends React.Component<INavigationButtonsProps> {

  public render(): React.ReactElement<INavigationButtonsProps> {

    return (
      <div
        className={this.props.className}
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}
      >

        <button
          type="button"
          onClick={this.props.onDashboard}
          style={{
            border: '0',
            borderRadius: '7px',
            padding: '9px 14px',
            background: '#e5e7eb',
            color: '#374151',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>

        {this.props.onBack && (
          <button
            type="button"
            onClick={this.props.onBack}
            style={{
              border: '0',
              borderRadius: '7px',
              padding: '9px 14px',
              background: '#eff6ff',
              color: '#2563eb',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {this.props.backLabel || 'Back'}
          </button>
        )}

      </div>
    );
  }
}