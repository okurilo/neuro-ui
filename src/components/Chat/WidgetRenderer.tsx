// src/components/Chat/WidgetRenderer.tsx
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
    // Если widget не содержит value, значит это непосредственно виджет
    const widgetData = widget.value ? widget.value : widget;

    switch (widgetData.type) {
        case 'Container':
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: widgetData.props?.direction || 'column',
                    position: widgetData.props?.position || 'default',
                    gap: '12px'
                }}>
                    {widgetData.children?.map((child: any, index: number) => (
                        <React.Fragment key={child.id || index}>
                            {createWidgetComponent(child)}
                        </React.Fragment>
                    ))}
                </div>
            );
        case 'Text':
            return <Text variant="bodyRegular">{widgetData.props?.text}</Text>;
        case 'Title':
        case 'H1':
        case 'H2':
        case 'H3':
            const titleSize = getHeadingSize(widgetData.type);
            const titleText = widgetData.props?.text || "";
            return <Title $size={titleSize}>{titleText}</Title>;
        case 'Button':
            return (
                <Button $type="primary" $size={widgetData.props?.size || "m"}>
                    {widgetData.props?.text}
                </Button>
            );
        case 'Input':
            return <input
                type="text"
                placeholder={widgetData.props?.placeholder}
                style={{
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0',
                    fontSize: '16px',
                    width: '100%'
                }}
            />;
        default:
            return <div>Неподдерживаемый тип виджета: {widgetData.type}</div>;
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