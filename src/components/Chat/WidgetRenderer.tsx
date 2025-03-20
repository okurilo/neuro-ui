import React from 'react';
import styled from 'styled-components';
import { Text, Title, Button } from '../../design-system';

interface WidgetProps {
    widget: any;
}

const WidgetContainer = styled('div')({
    marginTop: '8px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
});

const createWidgetComponent = (widget: any) => {
    switch (widget.type) {
        case 'Container':
            return (
                <div style={{ display: 'flex', flexDirection: widget.props.direction || 'column', gap: '12px' }}>
                    {widget.children?.map((child: any, index: number) => (
                        <React.Fragment key={child.id || index}>
                            {createWidgetComponent(child)}
                        </React.Fragment>
                    ))}
                </div>
            );
        case 'Text':
            return <Text variant="bodyRegular">{widget.props.text}</Text>;
        case 'Title':
        case 'H1':
        case 'H2':
        case 'H3':
            return <Title $size={getHeadingSize(widget.type)}>{widget.props.text}</Title>;
        case 'Button':
            return (
                <Button $type="primary" $size="m">
                    {widget.props.text}
                </Button>
            );
        case 'Input':
            return <input
                type="text"
                placeholder={widget.props.placeholder}
                style={{
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    fontSize: '16px',
                    width: '100%'
                }}
            />;
        default:
            return <div>Неподдерживаемый тип виджета: {widget.type}</div>;
    }
};

function getHeadingSize(type: string): "H1" | "H2" | "H3" | "subheadline" | "footnote" {
    switch (type) {
        case 'H1': return 'H1';
        case 'H2': return 'H2';
        case 'H3': return 'H3';
        case 'Title': return 'H2';
        default: return 'subheadline';
    }
}

export const WidgetRenderer: React.FC<WidgetProps> = ({ widget }) => {
    if (!widget) return null;

    return (
        <WidgetContainer>
            {createWidgetComponent(widget)}
        </WidgetContainer>
    );
};