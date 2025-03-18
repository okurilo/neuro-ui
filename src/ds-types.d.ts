// Типизация
declare namespace ProjectTypes {
  // components/ActionBar
  namespace components_ActionBar {
    interface ActionBarProps {
      $type?: ActionBarViewType;
    }
    type ActionBarViewType = "event" | "default";
  }
  // components/ActionSheet
  namespace components_ActionSheet {
    interface ActionSheetContextArgs {
      isOpened: boolean;
      setIsOpened: (isOpened: boolean) => void;
      overlayStyle?: CSSProperties;
    }
    interface ActionSheetProps {
      $trigger: ReactElement & RefAttributes<HTMLElement>;
      $align?: "start" | "end";
      $direction?: "bottom" | "top";
      $middleware?: Middleware[];
    }
  }
  // components/ActionSheet/Menu
  namespace components_ActionSheet_Menu {
    interface MenuItemProps {
      $disabled?: boolean;
    }
    interface MenuProps {
      $onAction?: (item: ReactElement) => void;
      children: ReactElement | ReactElement[];
    }
  }
  // components/Avatar
  namespace components_Avatar {
    interface AvatarProps extends AvatarVariants {
      $src?: string;
      $initials?: ReactNode;
      $noCandidate?: boolean;
      $candidateGrade?: ReactNode;
      $label?: ReactNode;
      $hasBadge?: boolean;
      $status?: ReactNode;
      $verificationStatus?: VerificationStatus;
      $icon?: ReactNode;
    }
    type AvatarSizes = Record<Size, SystemStyleObject>;
    type AvatarSizesConst = Record<Size, number>;
    interface AvatarVariants {
      $size?: Size;
    }
    type MapToCounterSize = Partial<Record<Size, CounterProps["$size"]>>;
    type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";
    interface StyledContentProps {
      $size?: Size;
    }
    type VerificationStatus = "accept" | "decline" | "no_result";
  }
  // components/Avatar/Content
  namespace components_Avatar_Content {
    interface ContentProps {
      $src: AvatarProps["$src"];
      $initials: AvatarProps["$initials"];
      $noCandidate: AvatarProps["$noCandidate"];
      $candidateGrade: AvatarProps["$candidateGrade"];
      $size: AvatarProps["$size"];
      $icon: AvatarProps["$icon"];
    }
    type TextSizes = CustomStyledProps<Size>;
    interface WrapperProps {
      $hasIcon?: boolean;
    }
  }
  // components/Avatar/MoreButton
  namespace components_Avatar_MoreButton {
    interface MoreButtonProps {
      $count?: number;
    }
  }
  // components/Avatar/Progress
  namespace components_Avatar_Progress {
    type Progress = "25%" | "50%" | "75%" | "100%";
    interface ProgressProps {
      $state: Progress;
    }
  }
  // components/Avatar/Verification
  namespace components_Avatar_Verification {
    interface VerificationProps {
      $verificationStatus: VerificationStatus;
    }
  }
  // components/AvatarStack
  namespace components_AvatarStack {
    interface AvatarStackProps {
      $type?: StackType;
      $size?: Size;
      $overlap?: Overlap;
    }
    type ButtonSize = "m" | "s";
    type Overlap = "default" | "reverse";
    type Size = "m" | "s" | "xs";
    type StackType = "ordinary" | "double";
  }
  // components/AvatarStack/Button
  namespace components_AvatarStack_Button {
    interface ButtonProps {
      $size: ButtonSize;
    }
    type Sizes = Record<ButtonSize, SystemStyleObject>;
  }
  // components/Backdrop
  namespace components_Backdrop {
    interface BackdropProps {
      $stickToBottomMobile?: boolean;
      lockScroll?: boolean;
      transparent?: boolean;
    }
  }
  // components/Box
  namespace components_Box {
    interface BoxProps
      extends BackgroundProps<DefaultTheme>,
        BorderProps<DefaultTheme>,
        ColorProps<DefaultTheme>,
        FlexboxProps<DefaultTheme>,
        GridProps<DefaultTheme>,
        LayoutProps<DefaultTheme>,
        PositionProps<DefaultTheme>,
        ShadowProps<DefaultTheme>,
        SpaceProps<DefaultTheme>,
        TypographyProps<DefaultTheme>,
        BackgroundColorProps<DefaultTheme>,
        BordersProps<DefaultTheme> {}
  }
  // components/BreadcrumbsDynamic
  namespace components_BreadcrumbsDynamic {
    type BreadcrumbItem = BreadcrumbItemFilled | BreadcrumbItemSkeleton;
    interface BreadcrumbItemFilled {
      title: string;
      href: string;
      onClick?: DOMAttributes<HTMLAnchorElement>["onClick"];
    }
    interface BreadcrumbItemSkeleton {
      skeleton: true;
    }
    interface BreadcrumbsContextArgs {
      lastWidth?: number;
      linkComponent?: FC<LinkHTMLAttributes<HTMLAnchorElement>>;
    }
    interface BreadcrumbsProps {
      items: BreadcrumbItem[];
      linkComponent?: FC<LinkHTMLAttributes<HTMLAnchorElement>>;
    }
  }
  // components/BreadcrumbsDynamic/MobileContainer
  namespace components_BreadcrumbsDynamic_MobileContainer {
    interface MobileContainerProps {
      items: BreadcrumbItem[];
    }
  }
  // components/BreadcrumbsDynamic/MobileContainer/HiddenBreadcrumbsModal
  namespace components_BreadcrumbsDynamic_MobileContainer_HiddenBreadcrumbsModal {
    interface HiddenBreadcrumbsModalProps {
      breadcrumbs: BreadcrumbItem[];
      handleClose: () => void;
    }
  }
  // components/BreadcrumbsDynamic/StandartContainer
  namespace components_BreadcrumbsDynamic_StandartContainer {
    interface StandartContainerProps {
      items: BreadcrumbItem[];
    }
  }
  // components/BreadcrumbsDynamic/StandartContainer/DropDown
  namespace components_BreadcrumbsDynamic_StandartContainer_DropDown {
    interface DropDownProps {
      hiddenItems: BreadcrumbItem[];
    }
  }
  // components/Button
  namespace components_Button {
    interface ButtonProps {
      $type?: Type;
      $size?: Size;
      $state?: State;
      $containsOnlyIcon?: boolean;
      $fullWidth?: boolean;
    }
    type Size = "l" | "m" | "s" | "xs";
    type State = "focus" | "hover" | "pressed";
    type Type = "primary" | "secondary" | "tertiary" | "mono" | "monoSecondary";
  }
  // components/Button/Icon
  namespace components_Button_Icon {
    interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      $state?: State | "default";
      $type?:
        | Exclude<Type, "mono" | "monoSecondary" | "tertiary">
        | "destructive"
        | "default";
      size?: Exclude<Size, "xs">;
    }
    type IconSize = Exclude<Size, "xs">;
  }
  // components/Button/More
  namespace components_Button_More {
    type MoreProps = Omit<ButtonProps, "$containsOnlyIcon">;
  }
  // components/Button/Plain
  namespace components_Button_Plain {
    interface ButtonProps {
      size?: PlainSize;
      state?: State | "disabled" | "visited" | "default";
      leadingIcon?: ReactElement;
      trailingIcon?: ReactElement;
    }
    type LabelSize = "s" | "m" | "xs" | "l";
    type PlainSize = Exclude<Size, "xs" | "l">;
  }
  // components/Button/Selection
  namespace components_Button_Selection {
    interface SelectionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      count?: number;
      title?: string;
      isDefined?: boolean;
      state?: State;
    }
  }
  // components/Card
  namespace components_Card {
    interface CardProps {
      $shadow?: boolean;
      $type?: Type;
    }
    type Type = "default" | "contrast";
  }
  // components/Carousel
  namespace components_Carousel {
    interface ActiveSlideActionType {
      type: "sliding" | "slideEnd" | "setLoop" | "updateState";
      payload?: {
        activeSlide?: number;
        $loop?: boolean;
        lastSlide?: number;
        totalSlides?: number;
      };
      amount?: number;
    }
    interface ActiveSlideStateType {
      animate: boolean;
      lastSlide: number;
      activeSlide: number;
      totalSlides: number;
      prev: number | null;
      next: number | null;
      direction: "prev" | "next" | null;
      $withAnimation: boolean;
      $loop?: boolean;
    }
    interface CarouselApiArgs {
      setActiveSlide: (activeSlide: number) => void;
    }
    interface CarouselContextType {
      handleSlideTo: (index: number) => void;
      activeSlide: number;
      totalSlides: number;
    }
    interface CarouselProps {
      $bordered?: boolean;
      $loop?: boolean;
      $withArrows?: boolean;
      $withAnimation?: boolean;
      $autoplay?: number;
      $hideDots?: boolean;
      $defaultActiveSlide?: number;
      $onChange?: (activeSlide: number) => void;
      $leftArrow?: ReactElement;
      $rightArrow?: ReactElement;
      $dots?: ReactElement | ReactElement[];
      $dynamicDots?: boolean;
      $dynamicDotsCount?: number;
      $dynamicDotsWidth?: number;
      children: ((args: CarouselApiArgs) => ReactNode) | ReactNode;
    }
    type CarouselState = {
      props: {
        totalSlides: number;
      };
    } & Pick<CarouselProps, "$autoplay" | "$onChange" | "$loop">;
    interface ContentProps {
      $activeSlide: number;
      $bordered?: boolean;
    }
    interface DotsDynamicConfig {
      startIndex: number;
      endIndex: number;
      offset: number;
    }
    type RenderArrowsProps = {
      $withArrows: CarouselProps["$withArrows"];
      $leftArrowProp: CarouselProps["$leftArrow"];
      $rightArrowProp: CarouselProps["$rightArrow"];
      $leftHidden?: boolean;
      $rightHidden?: boolean;
    };
    type RenderDotsProps = {
      $hideDots: CarouselProps["$hideDots"];
      $dotsProp: CarouselProps["$dots"];
      contentArray: Array<ReactNode>;
      dynamicConfig: DotsDynamicConfig;
    };
  }
  // components/Carousel/Arrow
  namespace components_Carousel_Arrow {
    type ArrowDirection = "left" | "right";
    interface ArrowProps {
      $direction?: ArrowDirection;
      $hidden?: boolean;
    }
  }
  // components/Carousel/Dot
  namespace components_Carousel_Dot {
    interface ContainerStyledProps {
      $offset?: number;
      $size?: Size;
    }
    interface DotProps extends DotStyledProps, ContainerStyledProps {
      $index?: number;
      style?: CSSProperties;
    }
    type DotsActiveVariants = Record<
      "true" | "false",
      (theme: DefaultTheme) => CSSProperties
    >;
    type DotsSizeVariants = CustomStyledProps<Size>;
    interface DotStyledProps {
      $isActive?: boolean;
    }
    type Size = "s" | "m" | "l";
  }
  // components/Carousel/DotsContainer
  namespace components_Carousel_DotsContainer {
    interface ContainerProps {
      $isDynamic?: boolean;
      $width?: number;
    }
    interface DotsContainerProps
      extends Pick<CarouselProps, "$dots" | "$dynamicDots">,
        Required<Pick<CarouselProps, "$dynamicDotsWidth">> {
      $dynamicDotsCount: number;
    }
  }
  // components/Cell
  namespace components_Cell {
    interface CellProps {
      $size?: Size;
      $divider?: boolean;
    }
    type Size = "s" | "m" | "l" | "xl";
  }
  // components/CellButton
  namespace components_CellButton {
    interface CellButtonContextArgs {
      $size?: Size;
      $type?: Types;
    }
    interface CellButtonProps {
      $size?: Size;
      $type?: Types;
    }
    type Size = "s" | "m" | "l";
    type Types = "button" | "more" | "more-arrow" | "more-text";
  }
  // components/CellButton/Icon
  namespace components_CellButton_Icon {
    interface IconProps {
      $isTurnedOver?: boolean;
      $size?: Size;
    }
    type IconSizes = Record<Size, SystemStyleObject>;
    type IconTypes = Partial<CustomStyledProps<Types>>;
  }
  // components/CellButton/Text
  namespace components_CellButton_Text {
    type TextProps = StyledComponentProps<
      "div",
      DefaultTheme,
      Record<string, unknown>,
      never
    >;
    type TextTypes = CustomStyledProps<Types>;
  }
  // components/CellMini
  namespace components_CellMini {
    interface CellMiniProps {
      $gap?: string | number;
      $alignCenter?: boolean;
    }
  }
  // components/CellMini/Contacts
  namespace components_CellMini_Contacts {
    interface ContactsProps {
      $prefixIcon?: JSX.Element;
      $postfixIcon?: JSX.Element;
    }
  }
  // components/CellRich
  namespace components_CellRich {
    interface CellRichProps {
      $icon?: ReactNode;
    }
  }
  // components/CellTimeline
  namespace components_CellTimeline {
    interface CellTimelineContextArgs {
      $size?: Size;
      $type?: Types;
    }
    interface CellTimelineProps {
      $type?: Types;
      $size?: Size;
    }
    type Size = "s" | "m" | "l";
    type Types = "history" | "chronology" | "progress";
  }
  // components/CellTimeline/Line
  namespace components_CellTimeline_Line {
    type LineTypes = Record<Types, SystemStyleObject>;
  }
  // components/CellTimeline/Point
  namespace components_CellTimeline_Point {
    type PointTypes = CustomStyledProps<Types>;
    type PointTypeSize = Partial<Record<Types, Partial<Record<Size, string>>>>;
    type PointTypeSizes = Record<
      Types,
      Partial<Record<Size, SystemStyleObject>>
    >;
  }
  // components/CellTimeline/PointSet
  namespace components_CellTimeline_PointSet {
    type PointSetTypeSizes = Partial<
      Record<Types, Record<Size, SystemStyleObject>>
    >;
  }
  // components/Checkbox
  namespace components_Checkbox {
    interface CheckboxContentProps {
      $disabled?: boolean;
    }
    interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
      $size?: Size;
      $mixed?: boolean;
      $state?: State;
    }
    interface CheckboxSizeProps {
      $size: Size;
    }
    type Size = "s" | "m";
    type State = "active" | "disabled" | "hover" | "focus" | "pressed";
  }
  // components/Checkbox/Icon
  namespace components_Checkbox_Icon {
    interface IconProps {
      checked?: boolean;
      mixed?: boolean;
    }
  }
  // components/Checkmark
  namespace components_Checkmark {
    interface CheckmarkContentProps {
      $disabled?: boolean;
    }
    interface CheckmarkProps extends InputHTMLAttributes<HTMLInputElement> {
      $size?: Size;
      $state?: State;
    }
    interface CheckmarkSizeProps {
      $size: Size;
    }
    type Size = "s" | "m";
    type State = "active" | "disabled" | "hover" | "focus" | "pressed";
  }
  // components/Checkmark/Icon
  namespace components_Checkmark_Icon {
    interface IconProps {
      checked?: boolean;
      mixed?: boolean;
    }
  }
  // components/Counter
  namespace components_Counter {
    interface BaseProps {
      $bordered?: boolean;
    }
    type Bordered = CustomStyledProps<"true" | "false">;
  }
  // components/Counter/Badge
  namespace components_Counter_Badge {
    interface BadgeProps extends BaseProps {
      $size?: Size;
      $style?: Style;
    }
    type Size = "m" | "l";
    type Style = "red" | "blue";
  }
  // components/Counter/RoundCounter
  namespace components_Counter_RoundCounter {
    interface CounterProps extends BaseProps {
      $size?: Size;
      $style?: Style;
    }
    type Size = "m" | "s";
    type Style = "default" | "black";
  }
  // components/DatePicker
  namespace components_DatePicker {
    interface DatePickerProps extends ReactDatePickerProps {
      $prefix?: "с" | "по" | string;
      $prefixLength?: number;
      $postfix?: ReactNode;
      $gutter?: "no" | "right";
    }
  }
  // components/DateTimePicker
  namespace components_DateTimePicker {
    interface DateTimePickerProps extends DatePickerProps {
      $time: TimeInputOptions;
    }
    interface TimeInputOptions {
      onChange: (e: FormEvent<HTMLInputElement>) => void;
      value: string;
    }
  }
  // components/Drawer
  namespace components_Drawer {
    interface BaseDrawerProps {
      title: string;
      isOpen: boolean;
      onClose: () => void;
      buttonPrimary: DrawerButtonProps;
      buttonSecondary: DrawerButtonProps;
      keepContentMounted?: boolean;
      width?: number;
      isOverlayHidden?: boolean;
      moreMenu?: SubItem[];
      moreMenuIcon?: React.ReactElement;
      onMoreMenuClick?: () => void;
      buttonExtra?: DrawerButtonProps;
      onTabChange?: () => void;
    }
    type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
    interface DrawerButtonProps {
      label: string;
      onClick: () => void;
      type?: ButtonType;
      isLoading?: boolean;
      loader?: ReactElement;
      attributes?: ButtonAttributes;
    }
    type DrawerProps = DrawerWithTabs | DrawerWithChildren;
    interface DrawerWithChildren extends BaseDrawerProps {
      tabs?: never;
      children: React.ReactNode;
    }
    interface DrawerWithTabs extends BaseDrawerProps {
      tabs: Tab[];
      children?: never;
    }
    type SelectItemsAndClickHandlerResult = {
      items: SubItem[];
      defaultClickHandler: (item?: SubItem) => void;
    };
    type SubItem = Tab & {
      isClickDisabled?: boolean;
      onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    };
    interface Tab {
      id: string;
      title: string;
      content: ({ onClick }: { onClick?: MouseEventHandler }) => ReactElement;
      subItems?: SubItem[];
    }
  }
  // components/Drawer/Content
  namespace components_Drawer_Content {
    interface ContentProps {
      isEmptyStack: boolean;
      selectItemsAndClickHandler: () => SelectItemsAndClickHandlerResult;
    }
  }
  // components/Drawer/Footer
  namespace components_Drawer_Footer {
    interface FooterProps {
      buttonPrimary: DrawerButtonProps;
      buttonSecondary: DrawerButtonProps;
      buttonExtra?: DrawerButtonProps;
      isBorderVisible?: boolean;
    }
  }
  // components/Drawer/Header
  namespace components_Drawer_Header {
    interface HeaderProps {
      currentTitle: string;
      isBackArrowVisible: boolean;
      onBackArrowClick: () => void;
      onItemClick: (item: SubItem) => void;
      onCloseDrawer: () => void;
      moreMenu?: SubItem[];
      moreMenuIcon?: React.ReactElement;
      onMoreMenuClick?: () => void;
    }
  }
  // components/Drawer/Header/MoreMenu
  namespace components_Drawer_Header_MoreMenu {
    type MoreMenuProps = Omit<
      HeaderProps,
      | "currentTitle"
      | "isBackArrowVisible"
      | "onBackArrowClick"
      | "onCloseDrawer"
    >;
  }
  // components/Feedback
  namespace components_Feedback {
    interface FeedbackProps extends TitleProps, RatingProps {
      $title: ReactNode;
      clarification?: TextFieldProps;
    }
  }
  // components/Feedback/TextField
  namespace components_Feedback_TextField {
    interface TextFieldProps extends Omit<FormFieldProps, "label"> {
      input?: ComponentProps<"textarea">;
      label?: ComponentProps<"label">;
    }
  }
  // components/Feedback/Title
  namespace components_Feedback_Title {
    interface TitleProps {
      $tooltip?: ReactNode;
    }
  }
  // components/Filters
  namespace components_Filters {
    interface FilterContentProps {
      $childrenCount: number;
    }
  }
  // components/Filters/Button
  namespace components_Filters_Button {
    interface ButtonsContainerProps<T> extends ButtonsContainerStyledProps {
      value?: T;
      onChange?: (value: T) => void;
    }
    interface ButtonsContainerStyledProps {
      $columns?: number;
      $hideElements?: boolean;
    }
    interface FilterButtonProps {
      id?: string;
      name?: string;
      value: string;
      checked?: boolean;
      onChange?: ChangeEventHandler<HTMLInputElement>;
      onClick?: MouseEventHandler<HTMLInputElement>;
    }
    interface MoreButtonProps {
      onClick?: MouseEventHandler;
    }
  }
  // components/Filters/PopupSelection
  namespace components_Filters_PopupSelection {
    interface ArrowSVGProps {
      $opened: boolean;
    }
    interface ContainerProps {
      $maxHeight?: Property.MaxHeight | number;
    }
    interface Item {
      content: string;
      key: string;
    }
    interface PopupSelectionProps {
      fieldValue?: string;
      width?: Property.Width | number;
      onReset?: () => void;
    }
    interface PopupSelectionStyledProps {
      $width?: Property.Width | number;
    }
    interface TriggerProps {
      $focused: boolean;
    }
  }
  // components/Filters/__stories__
  namespace components_Filters___stories__ {
    interface Item {
      content: string;
      key: string;
    }
  }
  // components/FormField
  namespace components_FormField {
    interface FormFieldProps {
      label?: ReactNode;
      control?: ReactNode;
      hint?: ReactNode;
      error?: ReactNode;
      addon?: ReactNode;
      children?: ReactNode;
    }
  }
  // components/GlobalCSSVariables
  namespace components_GlobalCSSVariables {
    interface JSONObject {
      [x: string]: JSONValue;
    }
    type JSONValue = string | JSONObject | JSONValue[];
  }
  // components/GradientButton
  namespace components_GradientButton {
    interface GradientButtonProps
      extends InputHTMLAttributes<HTMLInputElement> {
      $size?: Size;
    }
    type GradientButtonSizes = CustomStyledProps<Size>;
    type GradientButtonStates = CustomStyledProps<State>;
    interface GradientButtonStyledProps {
      $size?: Size;
      $state?: "disabled";
    }
    type Size = "s" | "m";
    type State = "disabled";
  }
  // components/Group
  namespace components_Group {
    type GroupColumns = "1" | "2" | "3";
    interface GroupProps {
      $columns?: GroupColumns;
    }
  }
  // components/Group/MoreButton
  namespace components_Group_MoreButton {
    interface MoreButtonProps {
      $opened?: boolean;
      $openedText?: string;
      $closedText?: string;
      onClick?: () => void;
      children?: ReactNode;
    }
  }
  // components/Input/TextArea
  namespace components_Input_TextArea {
    interface TextAreaProps
      extends StyledComponentProps<
        "textarea",
        DefaultTheme,
        Record<string, unknown>,
        never
      > {}
  }
  // components/Input/variants/ChipsInput
  namespace components_Input_variants_ChipsInput {
    interface ChipsInputProps {
      $chips: ReactElement[];
      inputProps?: InputHTMLAttributes<HTMLInputElement>;
    }
  }
  // components/Input/variants/PrefixPostfix
  namespace components_Input_variants_PrefixPostfix {
    type ForwardRef =
      | ((instance: HTMLInputElement | null) => void)
      /* eslint-disable-next-line */
      | LegacyRef<Component<HTMLInputElement, unknown, unknown>>
      | MutableRefObject<HTMLInputElement | null>
      | null;
    type PrefixLengthType = number;
    interface PrefixPostfixProps extends HTMLProps<HTMLInputElement> {
      children?: ReactNode;
      $prefix?: PrefixStringType | ReactNode;
      $prefixLength?: PrefixLengthType;
      $postfix?: ReactNode;
      disabled?: boolean;
      $control?: ReactNode;
      innerRef?: ForwardRef;
    }
    type PrefixStringType = "с" | "по" | "от" | "до" | string;
  }
  // components/Layout/Column
  namespace components_Layout_Column {
    interface ColumnProps {
      cols: number | (null | number)[];
    }
  }
  // components/Layout/Provider
  namespace components_Layout_Provider {
    interface ProviderProps {
      offset?: number;
    }
    interface UseBodyWidth {
      width: number;
    }
  }
  // components/LayoutGrid/Grid
  namespace components_LayoutGrid_Grid {
    type BreakpointValue =
      | Span
      | {
          order?: number;
          span: Span;
          start?: number | "auto";
        };
    interface ItemProps {
      subgrid?: boolean;
      s?: BreakpointValue;
      m?: BreakpointValue;
      l?: BreakpointValue;
      s320?: BreakpointValue;
      s480?: BreakpointValue;
      m600?: BreakpointValue;
      m720?: BreakpointValue;
      m840?: BreakpointValue;
      l1024?: BreakpointValue;
      l1280?: BreakpointValue;
      l1440?: BreakpointValue;
      l1600?: BreakpointValue;
      l1920?: BreakpointValue;
    }
    type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "*";
  }
  // components/LayoutGrid/Layout
  namespace components_LayoutGrid_Layout {
    interface AsideProps {
      $stickToBottom?: boolean;
      $width?: number;
    }
  }
  // components/Loader
  namespace components_Loader {
    interface LoaderProps {
      $mode?: "dark" | "light";
    }
  }
  // components/Modal
  namespace components_Modal {
    type ContentColumns = Record<Size, (number | null)[]>;
    interface ModalContextArgs {
      headerRef?: RefObject<HTMLDivElement>;
      actionBarRef?: RefObject<HTMLDivElement>;
      headerIsSticky?: boolean;
      actionBarIsSticky?: boolean;
      $size?: Size;
      cols?: (number | null)[];
    }
    interface ModalProps extends ModalBaseProps {
      $actionBar?: ReactNode;
      $header?: ReactNode;
    }
    type PaddingSizes = Record<Size, SystemStyleObject>;
    type Placement = "right" | "edges";
    type PlacementStyles = Record<Placement, SystemStyleObject>;
  }
  // components/Modal/ActionBar
  namespace components_Modal_ActionBar {
    interface ActionBarProps
      extends StyledComponentProps<
        "div",
        DefaultTheme,
        Record<string, unknown>,
        never
      > {
      $placement?: Placement;
    }
    type ActionBarStickyVariants = Record<"true" | "false", SystemStyleObject>;
    interface ActionBarStyledProps {
      $isSticky: boolean;
      $size?: Size;
    }
  }
  // components/Modal/ActionButton
  namespace components_Modal_ActionButton {
    type ActionButtonIconVariants = Record<"true" | "false", SystemStyleObject>;
    interface ActionButtonProps {
      $containsOnlyIcon?: boolean;
    }
  }
  // components/Modal/Alert
  namespace components_Modal_Alert {
    interface ModalAlertProps {
      $onClose?: ModalBaseProps["$onClose"];
      $title?: ReactNode;
      $content?: ReactNode;
      $onCancel?: MouseEventHandler<HTMLButtonElement>;
      $onOk?: MouseEventHandler<HTMLButtonElement>;
      $cancelText?: ReactNode;
      $okText?: ReactNode;
    }
  }
  // components/Modal/Base
  namespace components_Modal_Base {
    interface ColumnStyledProps {
      $scrollBarWidth?: number;
    }
    interface ModalBaseProps
      extends StyledComponentProps<
        "div",
        DefaultTheme,
        Record<string, unknown>,
        never
      > {
      $size?: Size;
      $onClose?: () => void;
    }
    type Size = "s" | "m" | "l";
  }
  // components/Modal/Base/Body
  namespace components_Modal_Base_Body {
    interface BodyStyledProps {
      $size?: Size;
    }
  }
  // components/Modal/Body
  namespace components_Modal_Body {
    interface BodyProps {
      $paddings?: boolean;
    }
  }
  // components/Modal/Header
  namespace components_Modal_Header {
    interface HeaderProps
      extends StyledComponentProps<
        "div",
        DefaultTheme,
        Record<string, unknown>,
        never
      > {
      children:
        | ReactNode
        | (({ $isSticky }: { $isSticky: boolean }) => ReactNode);
      $placement?: Placement;
    }
    type HeaderStickyVariants = Record<"true" | "false", SystemStyleObject>;
    interface HeaderStyledProps {
      $isSticky: boolean;
    }
  }
  // components/Modal/ModalCard
  namespace components_Modal_ModalCard {
    interface ModalCardProps {
      $onClose?: () => void;
    }
  }
  // components/Modal/StubStickyElement
  namespace components_Modal_StubStickyElement {
    interface StubStickyElementProps {
      isSticky: boolean;
      stickyRef?: RefObject<HTMLElement>;
    }
  }
  // components/Modal/__stories__
  namespace components_Modal___stories__ {
    interface StoryExtraProps {
      storyHeaderType: "Breadcrumbs";
      storyContentSize: "small" | "large";
    }
  }
  // components/Modal/hooks
  namespace components_Modal_hooks {
    interface UseClickOverlayArgs {
      $onClose?: () => void;
    }
  }
  // components/ModalNew
  namespace components_ModalNew {
    interface ActionsItem {
      label: string;
      url: string;
      onAction: () => void;
      isDisabled?: boolean;
    }
    interface Button {
      label: string;
      onClick?: () => void;
      attributes?: ButtonAttributes;
    }
    type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
    interface ModalContextArgs
      extends Omit<ModalProps, "title" | "onClose">,
        Partial<Pick<ModalProps, "title" | "onClose">> {}
    interface ModalProps {
      title: string;
      onClose: () => void;
      type?: ModalType;
      description?: string;
      breadcrumbs?: BreadcrumbsProps;
      tag?: string;
      actionsMenu?: ActionsItem[];
      buttons?: {
        apply?: Button;
        cancel?: Button;
        tertiary?: Button;
      };
      steps?: { current: number; all: number };
      isClosableOverlay?: boolean;
      isTransparentOverlay?: boolean;
      isCloseByEsc?: boolean;
      wrapClassName?: string;
      isDisabledActions?: boolean;
      header?: ReactNode;
      hasDividers?: boolean;
    }
    type ModalType = "default" | "fullscreen" | "alert";
  }
  // components/ModalNew/Body
  namespace components_ModalNew_Body {
    interface BodyProps {
      hasDividers?: boolean;
    }
  }
  // components/ModalNew/Header/Actions
  namespace components_ModalNew_Header_Actions {
    interface ActionsProps {
      $disabled?: boolean;
    }
  }
  // components/Notification
  namespace components_Notification {
    interface NotificationAction {
      handler: () => void;
      text?: string;
    }
    interface NotificationProps {
      $icon?: ReactNode;
      $action?: NotificationAction;
      $onClose?: () => void;
      $background?: Color;
    }
  }
  // components/Pagination/Navigation
  namespace components_Pagination_Navigation {
    interface NavigationCountProps {
      $currentPage?: number;
      $totalPages: number;
      $onChange: (newCurrentPage: number) => void;
    }
    interface NavigationProps {
      $onForward?: (nextActiveIdx: number) => void;
      $onBackward?: (nextActiveIdx: number) => void;
    }
  }
  // components/Pagination/Navigation/Control
  namespace components_Pagination_Navigation_Control {
    interface ControlProps {}
  }
  // components/Pagination/Navigation/Item
  namespace components_Pagination_Navigation_Item {
    type ItemProps = StyledComponentProps<
      "button",
      DefaultTheme,
      Pick<ItemStyledProps, "$isActive">,
      never
    >;
    interface ItemStyledProps {
      $isActive?: boolean;
    }
  }
  // components/Pagination/Navigation/List
  namespace components_Pagination_Navigation_List {
    interface ListCountProps {
      currentPage: number;
      totalPages: number;
      onChange: (newCurrentPage: number) => void;
    }
    interface ListItemsProps {
      onForward: (nextActiveIdx: number) => void;
      onBackward: (nextActiveIdx: number) => void;
    }
  }
  // components/Popover
  namespace components_Popover {
    interface PopoverContentProps {
      children?: ReactNode;
    }
    interface PopoverContextProps {
      setTrigger?: (el: HTMLDivElement) => void;
      setContent?: (el: HTMLDivElement) => void;
      trigger?: HTMLDivElement;
      content?: HTMLDivElement;
      styles: { [key: string]: CSSProperties };
      attributes: { [key: string]: { [key: string]: string } | undefined };
      isOpen?: boolean;
      position?: FloatingProps["strategy"];
      handleSetOpen?: (open: boolean) => void;
    }
    interface PopoverOutsideClickProps {
      ignoredElements?: HTMLElement[];
      onClick: () => void;
    }
    interface PopoverProps {
      trigger: ReactElement;
      isOpen?: boolean;
      onChange?: (isOpen: boolean) => void;
      position?: FloatingProps["strategy"];
      placement?: FloatingProps["placement"];
      fallbackPlacements?: Array<
        Exclude<FloatingProps["placement"], undefined>
      >;
      gutter?: number;
      interactionType?: FloatingProps["interactionType"];
      middleware?: FloatingProps["middleware"];
      disabled?: boolean;
      arrowComponent?: ReactElement;
    }
  }
  // components/PushNotifications
  namespace components_PushNotifications {
    interface ContainerProps {
      state?: TransitionStatus;
    }
    interface PushNotificationsProps {
      $visible?: boolean;
    }
  }
  // components/PushNotifications/Item
  namespace components_PushNotifications_Item {
    interface ItemProps {
      $closeButton?: ReactElement;
      $actionButton?: ReactElement;
    }
  }
  // components/Radio
  namespace components_Radio {
    interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
      $state?: State;
    }
    type State = "active" | "disabled" | "hover" | "focus" | "pressed";
  }
  // components/RadioGroup
  namespace components_RadioGroup {
    interface RadioGroupProps {
      children: ReactNode | ReactNode[];
      title?: string;
    }
  }
  // components/Range
  namespace components_Range {
    type ColorVars = typeof c.DEFAULT | typeof c.PRIMARY | typeof c.SECONDARY;
    interface MultiRangeSlideProps extends RangeSliderProps {
      value: Tuple<number>;
      onChange?(value: Tuple<number>): void;
    }
    interface ProgressProps
      extends StyledComponentProps<
        "div",
        DefaultTheme,
        Record<string, unknown>,
        never
      > {
      $disabled?: boolean;
      $state?: string;
      $color?: ColorVars | string;
    }
    interface RangeSliderProps {
      $color?: ColorVars;
      $disabled?: boolean;
      title?: ReactNode | string;
      progressView?: ReactNode | string;
      marks?: Mark[];
      min?: number;
      max?: number;
      step?: number;
    }
    interface SingleRangeSliderProps extends RangeSliderProps {
      value: number;
      onChange?(value: number): void;
    }
    type Tuple<T> = [T, T];
  }
  // components/Range/Marks
  namespace components_Range_Marks {
    interface Mark {
      label: ReactNode | string;
      description?: ReactNode | string;
    }
    interface MarksComponentProps {
      list?: Mark[];
    }
  }
  // components/Range/Multi
  namespace components_Range_Multi {
    type RangeElem = { offsetWidth: number; value: number } | null;
  }
  // components/Rating
  namespace components_Rating {
    interface RatingProps {
      $rate?: number;
      $onChange?: (rate: number) => void;
    }
  }
  // components/Rating/Star
  namespace components_Rating_Star {
    interface StarProps extends Record<string, unknown> {
      $isActive?: boolean;
      onChange: () => void;
    }
    interface StarStyledProps {
      $isActive: StarProps["$isActive"];
    }
  }
  // components/Scrollbar
  namespace components_Scrollbar {
    interface ScrollbarProps {
      theme: DefaultTheme;
      platform?: "win";
    }
  }
  // components/Search
  namespace components_Search {
    interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
      id?: string;
      name?: string;
      value: string;
      onChange: ChangeEventHandler<HTMLInputElement>;
      $postfix?: JSX.Element;
      placeholder?: string;
    }
  }
  // components/Select
  namespace components_Select {
    interface ButtonTextProps {
      $state: "filled" | "placeholder" | "disabled";
      isHiddenText: boolean;
    }
    interface OptionProps<ValueP extends Value = string> {
      value?: SelectProps<ValueP>["value"];
      children: ReactNode;
    }
    interface SelectProps<ValueP extends Value = string> {
      placeholder?: string;
      children:
        | ReactElement<OptionProps<ValueP>>
        | ReactElement<OptionProps<ValueP>>[];
      value?: ValueP;
      onChange?: (value: ValueP) => void;
      isDisabled?: boolean;
      isOpen?: boolean;
      onSelectToggle?: (isOpen: boolean) => void;
      optionsListMaxHeight?: Property.MaxHeight<number>;
      minWidth?: string;
    }
    type Value = string | number;
  }
  // components/Select/Option
  namespace components_Select_Option {
    interface InternalOptionProps {
      selected?: boolean;
      onClick?: () => void;
      minWidth?: string;
    }
    interface OptionProps<ValueP extends Value = string> {
      value?: SelectProps<ValueP>["value"];
      children: ReactNode;
    }
    type OptionPropsGeneric<ValueP extends Value = string> = FC<
      OptionProps<ValueP>
    >;
  }
  // components/Select/OptionsList
  namespace components_Select_OptionsList {
    type Children<ValueP extends Value> = ReactElement<
      OptionProps<ValueP> & InternalOptionProps
    >;
    interface OptionsListProps<ValueP extends Value> {
      value: SelectProps<ValueP>["value"];
      onChange: SelectProps<ValueP>["onChange"];
      setIsOpened: (isOpened: boolean) => void;
      children: Children<ValueP> | Children<ValueP>[];
      maxHeight?: SelectProps["optionsListMaxHeight"];
    }
  }
  // components/Skeleton
  namespace components_Skeleton {
    type SkeletonCircleProps = SkeletonProps;
    interface SkeletonProps extends LayoutProps, SpaceProps, ColorProps {}
    type SkeletonRectProps = SkeletonProps;
    interface SkeletonTextProps extends SkeletonProps {
      firstLineHeight?: TypographyVariant;
      lineHeight?: TypographyVariant;
      lines?: number;
    }
    type TypographyVariant = keyof DefaultTheme["typography"];
  }
  // components/Snackbar/Content
  namespace components_Snackbar_Content {
    interface ContentProps {
      compact?: boolean;
    }
  }
  // components/SplitView
  namespace components_SplitView {
    interface MoreMenuItem extends PropsWithChildren {
      id: string;
      onClick?: () => void;
    }
    interface SplitViewProps {
      url: string;
      isOpen: boolean;
      onClose: () => void;
      moreMenu?: MoreMenuItem[];
      defaultWidth?: number;
      minWidth?: number;
      keepContentMounted?: boolean;
      newTabActionTitle?: string;
    }
  }
  // components/SplitView/InternalUnit
  namespace components_SplitView_InternalUnit {
    interface InternalUnitProps
      extends Omit<
        SplitViewProps,
        "defaultWidth" | "minWidth" | "keepContentMounted"
      > {
      isResizing: boolean;
      handleResizeRef: RefObject<HTMLDivElement>;
      toggleSplitViewWidth: () => void;
    }
  }
  // components/Stories
  namespace components_Stories {
    interface StoriesProps {
      onClose: () => void;
      stories: StoryStack | StoriesStacksList;
      isPaused?: boolean;
      loop?: boolean;
      defaultDuration?: number;
      currentIndex?: number;
      currentStackIndex?: number;
      keyboardNavigation?: boolean;
      onAllStoriesEnd?: (id: number, stories: StoryObject[]) => void;
      onStoryStart?: StoryProgress;
      onStoryEnd?: StoryProgress;
      onNext?: () => void;
      onPrevious?: () => void;
    }
    type StoryProgress = (
      storyIndex: number,
      stackIndex: number,
      story: StoryObject
    ) => void;
  }
  // components/Stories/Container
  namespace components_Stories_Container {
    interface UseSwipeStackSwitch {
      currentStackId: number;
      onSwitch: (nextStackId: number) => void;
    }
  }
  // components/Stories/Header
  namespace components_Stories_Header {
    interface HeaderProps {
      story: StoryObject;
      isPaused?: boolean;
      isLoaded: boolean;
      togglePauseState: TogglePauseStateFunc;
      isMuted?: boolean;
      setMuted?: (state: boolean) => void;
    }
  }
  // components/Stories/Modal
  namespace components_Stories_Modal {
    interface ModalProps {
      onClose: StoriesProps["onClose"];
    }
  }
  // components/Stories/NavigationButtons
  namespace components_Stories_NavigationButtons {
    interface NavigationButtonProps {
      previous?: () => void;
      next?: () => void;
    }
  }
  // components/Stories/Progress
  namespace components_Stories_Progress {
    interface ProgressProps {
      currentId: number;
      stackItem: StoryObject[];
      stackItemIndex: number;
    }
  }
  // components/Stories/Provider
  namespace components_Stories_Provider {
    type ProviderProps = Omit<StoriesProps, "onClose">;
  }
  // components/Stories/Story
  namespace components_Stories_Story {
    interface StoryProps {
      currentId: number;
      stackItem: StoryObject[];
      stackItemIndex: number;
    }
  }
  // components/Stories/context
  namespace components_Stories_context {
    interface GlobalContextProps
      extends Omit<StoriesProps, "onClose" | "stories"> {
      togglePauseState: TogglePauseStateFunc;
    }
    interface StoriesContextProps {
      stackList: StoryObject[][];
    }
    interface StorySlideContextProps {
      currentStackId: number;
      videoDuration?: number;
      stories: StoryObject[];
      next?: () => void;
      previous?: () => void;
      updateVideoDuration?: (duration: number) => void;
    }
  }
  // components/Stories/renderers
  namespace components_Stories_renderers {
    type RendererProps = FC<{
      previous?: () => void;
      next?: () => void;
      togglePauseState: TogglePauseStateFunc;
      isPaused?: boolean;
      story: StoryObject;
      messageHandler: (type: string, story: StoryObject) => void;
      hasHeader?: boolean;
      loadingErrorText?: string;
    }>;
    type StoriesStacksList = StoryStack[];
    interface StoryObject {
      setSet?: string;
      url?: string;
      header?: {
        heading: string;
        subheading: string;
        profileImage: string;
        onClickProfileImage?: () => void;
      };
      type?: "image" | "video";
      duration?: number;
      content?: RendererProps;
      renderer?: RendererProps;
      hasProgressBar?: boolean;
    }
    type StoryStack = (StoryObject | string)[];
    type TesterFunc = (story: StoryObject) => {
      condition: boolean;
      priority: number;
    };
    type TogglePauseStateFunc = (action: boolean | undefined) => void;
  }
  // components/Summary
  namespace components_Summary {
    type ColumnProps = Pick<SummaryProps, "isHorizontalColumn" | "columnCount">;
    type Layout = "horizontal" | "vertical";
    type LayoutContextArgs = Pick<
      SummaryProps,
      "layout" | "isHorizontalColumn"
    >;
    interface SummaryProps {
      children?:
        | ReactElement<SummaryItemProps>
        | ReactElement<SummaryItemProps>[]
        | ReactNode;
      layout?: Layout;
      isHorizontalColumn?: boolean;
      columnCount?: СolumnsCount;
    }
  }
  // components/Summary/SummaryItem
  namespace components_Summary_SummaryItem {
    interface LabelProps {
      label?: string;
      labelWidth?: number;
      tooltipValue?: string;
    }
    type SummaryItemProps = LabelProps & ValueProps;
    interface ValueProps {
      value?: string;
      description?: string;
      hasDescriptionOwnLine?: boolean;
      error?: string;
      button?: "default" | "more";
      onClickButton?: (...args: unknown[]) => void;
    }
  }
  // components/Switch
  namespace components_Switch {
    interface SwitchContentProps {
      $disabled?: boolean;
    }
  }
  // components/Tabs
  namespace components_Tabs {
    type TabExtraStatesType = "selected";
    interface TabsProps {
      $type?: Type;
    }
    type Type = "primary" | "secondary" | "tertiary";
  }
  // components/Tabs/Tab
  namespace components_Tabs_Tab {
    type States = "active" | "hover" | "focus" | "selected" | "pressed";
    interface TabProps {
      $isActive?: boolean;
      $type?: Type;
      $badge?: boolean;
      $state?: States;
    }
  }
  // components/Tags/Chips
  namespace components_Tags_Chips {
    interface ChipsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      $state?: State;
      $type?: Type;
      $size?: Size;
      $isSelection?: boolean;
    }
    type Size = "s" | "m";
    type State = "default" | "hover" | "focus" | "active" | "selection";
    type Type = "default" | "warnings" | "alert";
  }
  // components/Tags/Filter
  namespace components_Tags_Filter {
    interface FilterProps {
      $state?: State;
      $counter?: number;
      $color?: Color;
    }
    type State = "default" | "disabled";
  }
  // components/Tags/Hashtag
  namespace components_Tags_Hashtag {
    interface HashtagProps {
      $state?: State;
    }
    type State = "default" | "hover" | "focus" | "active";
  }
  // components/Tags/Selectable
  namespace components_Tags_Selectable {
    interface SelectableProps {
      $state?: State;
      $size?: Size;
      $selected?: boolean;
    }
    type Size = "m" | "l";
    type State = "default" | "hover" | "focus" | "selected" | "active";
  }
  // components/Tags/Tag
  namespace components_Tags_Tag {
    type Color = TagColor;
    type TagColor =
      | "yellow"
      | "blue"
      | "purple"
      | "orange"
      | "magenta"
      | "green"
      | "red"
      | "teal"
      | "cyan"
      | "lime"
      | "grey";
    interface TagProps {
      $size?: "s" | "m";
      $color?: Color;
    }
  }
  // components/Text
  namespace components_Text {
    interface TextProps
      extends ColorProps<DefaultTheme>,
        SpaceProps<DefaultTheme> {
      variant: Variant | ResponsiveValue<Variant, DefaultTheme>;
    }
    type Variant = keyof DefaultTheme["typography"];
  }
  // components/TimeCounter
  namespace components_TimeCounter {
    interface TimeCounterProps extends HTMLProps<HTMLInputElement> {
      $decrease: () => void;
      $increase: () => void;
    }
  }
  // components/TimePicker
  namespace components_TimePicker {
    interface TimePickerProps extends HTMLProps<HTMLInputElement> {
      children?: ReactNode;
      ref?: Ref<HTMLInputElement>;
      $prefix?: "от" | "до";
      $postfix?: ReactNode;
    }
  }
  // components/Title
  namespace components_Title {
    type Size = "H1" | "H2" | "H3" | "subheadline" | "footnote";
    interface TitleContextType {
      $size?: TitleProps["$size"];
      $state?: TitleStates;
    }
    interface TitleProps {
      $size: Size;
      $isTab?: boolean;
      $isActive?: boolean;
    }
    type TitleStates = "selected";
  }
  // components/Title/Action
  namespace components_Title_Action {
    interface ActionProps {
      $size?: Size;
    }
  }
  // components/Tooltip
  namespace components_Tooltip {
    type ArrowElem = SVGSVGElement | null;
    interface TooltipContextProps {
      $type: TooltipType;
      arrowRef: MutableRefObject<ArrowElem>;
    }
    interface TooltipProps extends Pick<FloatingProps, "delay"> {
      $trigger: ReactElement;
      $type?: TooltipType;
      $offset?: number;
      $placement?: FloatingProps["placement"];
      arrowComponent?: ReactElement;
      interactionType?: FloatingProps["interactionType"];
      middleware?: FloatingProps["middleware"];
      strategy?: FloatingProps["strategy"];
    }
    type TooltipType = "rich" | "default";
  }
  // components/Tree/Node
  namespace components_Tree_Node {
    interface ArrowProps {
      $isOpen?: boolean;
    }
    interface NestedContentProps {
      $isOpen?: boolean;
    }
    interface NodeProps {
      $label?: ReactNode;
      $isOpen?: boolean;
    }
  }
  // components/Upload
  namespace components_Upload {
    interface ContainerProps {
      $state: State;
    }
    type State = "default" | "hover" | "loading" | "loaded";
    interface UploadOnChangeProp {
      file?: File;
      changeInnerState: () => void;
    }
    interface UploadProps {
      inputProps?: Omit<ComponentProps<"input">, "onChange">;
      progress?: number;
      onChange: ({ file, changeInnerState }: UploadOnChangeProp) => void;
      labelText: string;
      firstHalfText: string;
      secondHalfText: string;
      id?: string;
    }
    interface UseFileState {
      filename: string;
      clearFiles: () => void;
      handleDragEnter: DragEventHandler;
      handleDragLeave: DragEventHandler;
      handleDrop: DragEventHandler;
      ref: RefObject<HTMLInputElement>;
      state: State;
      handleChange: ChangeEventHandler;
    }
  }
  // components/Upload/Content
  namespace components_Upload_Content {
    interface ContentProps {
      state: State;
      filename: string;
      clearFiles: () => void;
      progress?: number;
      labelText: string;
      firstHalfText: string;
      secondHalfText: string;
      labelId?: string;
    }
  }
  // components/Upload/Progress
  namespace components_Upload_Progress {
    interface ProgressProps {
      percent: number;
    }
  }
  // components/Videoplayer
  namespace components_Videoplayer {
    interface ActionTooltipMessage {
      on: string;
      off: string;
    }
    type ContainerElement = HTMLDivElement;
    interface ContainerProps {
      $ratio: number;
      isCursorVisible: boolean;
    }
    type ContainerRef = RefObject<ContainerElement>;
    interface ControlBarProps extends VideoPlaylistOptions {
      state?: TransitionStatus;
      $onHoverPreviewChange: VideoplayerProps["$onHoverPreviewChange"];
    }
    interface Error {
      title?: string;
      description?: string;
    }
    type HlsElement = Hls | null;
    type HlsRef = RefObject<HlsElement>;
    type HotkeyData = {
      keyCode: KeyboardEvent["code"];
      label: string;
    };
    interface IconWrapperProps {
      $icon?: ReactNode;
      $onClick: MouseEventHandler;
      $actionType: VideoplayerActions;
    }
    type OtherTrack = TrackBase & {
      kind: Exclude<TrackKind, "subtitles">;
      srclang?: never;
    };
    interface PlaybackContextProps {
      currentTime: number;
      duration: number;
      bufferedTimes?: TimeRanges;
    }
    interface SkeletonProps {
      $isError?: boolean;
    }
    interface Source {
      src: string;
      type?: string;
      quality?: number;
      label?: string;
    }
    interface SubtitlesTrack extends TrackBase {
      kind: "subtitles";
      srclang: string;
    }
    interface TagContent {
      content: string;
      hotkey?: string;
    }
    type TooltipMessages = string | ActionTooltipMessage;
    type Track = SubtitlesTrack | OtherTrack;
    interface TrackBase {
      src: string;
      label: string;
      kind: TrackKind;
    }
    type TrackKind =
      | "subtitles"
      | "captions"
      | "descriptions"
      | "chapters"
      | "metadata";
    interface TransitionWrapperProps extends Omit<ControlBarProps, "state"> {
      interactionsStarted: boolean;
      hovered: boolean;
      activeMenu: VideoplayerMenu;
      isActive: boolean;
    }
    type VideoElement = HTMLVideoElement;
    type VideoHotkeys = Record<
      Exclude<VideoplayerActions, "settings" | "repeat" | "prev" | "next">,
      HotkeyData
    >;
    type VideoplayerActions =
      | "prev"
      | "next"
      | "fullscreen"
      | "settings"
      | "repeat"
      | "mute"
      | "play"
      | "pausePlay"
      | "rewindForward"
      | "rewindBackward";
    interface VideoplayerContextProps {
      videoRef: VideoRef;
      containerRef: ContainerRef;
      hlsRef: HlsRef;
      $sources: VideoplayerProps["$sources"];
      activeMenu?: VideoplayerMenu;
      setActiveMenu?: Dispatch<SetStateAction<VideoplayerMenu>>;
    }
    type VideoplayerMenu =
      | "main"
      | "quality"
      | "subtitles"
      | "playbackRate"
      | "audiotracks"
      | null;
    interface VideoplayerProps
      extends VideoPlaylistOptions,
        VideoHTMLAttributes<HTMLVideoElement> {
      $sources: Source[];
      $poster?: string;
      $currentProgress?: number;
      $onInit?: (player: HTMLVideoElement) => void;
      $handleSendProgress?: (percent: number, currentTime: number) => void;
      $onHoverPreviewChange?: (hoveredTime: number) => string;
      $registerProgressDelay?: number;
      $error?: Error;
      $textTracks?: Track[];
      $hlsConfig?: HlsConfig;
    }
    interface VideoPlaylistOptions {
      $prevVideo?: VideoShortInfo;
      $nextVideo?: VideoShortInfo;
    }
    type VideoQualitySettings = Record<string, string>;
    type VideoRef = RefObject<VideoElement>;
    interface VideoShortInfo {
      onClick: () => void;
      previewImg?: string;
      description?: string;
    }
  }
  // components/Videoplayer/ControlBar/PlaylistControl
  namespace components_Videoplayer_ControlBar_PlaylistControl {
    interface PlaylistControlProps {
      $videoShortInfo: VideoShortInfo;
      $actionType: Extract<VideoplayerActions, "prev" | "next">;
    }
  }
  // components/Videoplayer/ControlBar/Volume
  namespace components_Videoplayer_ControlBar_Volume {
    interface VolumeBarProps {
      state?: TransitionStatus;
    }
  }
  // components/Videoplayer/Playlist
  namespace components_Videoplayer_Playlist {
    interface Playlist {
      title: string;
      items: PlaylistItem[];
    }
    interface PlaylistItem {
      sources: Source[];
      smallPoster?: string;
      videoPoster?: string;
      title?: string;
      duration?: number;
      textTracks?: Track[];
    }
    interface PlaylistProps {
      $header?: ReactNode;
      $counter?: ReactNode;
    }
    interface PreviewProps {
      $src: string;
    }
    interface VideoCellContextProps {
      $isPlaying?: boolean;
      hovered?: boolean;
    }
    interface VideoCellProps {
      $prefix?: JSX.Element;
      $isPlaying?: boolean;
    }
  }
  // components/Videoplayer/ProgressBar
  namespace components_Videoplayer_ProgressBar {
    interface BufferedTimeRangesProps {
      timeRanges?: TimeRanges;
      duration: number;
      currentTime: number;
    }
    interface PreviewImageProps {
      $src?: string;
    }
    interface ProgressBarProps {
      $type?: ProgressBarType;
      $hovered?: boolean;
      $onHoverPreviewChange?: ControlBarProps["$onHoverPreviewChange"];
    }
    type ProgressBarType = "default" | "actual" | "buffered" | "hovered";
    interface TimeTooltipProps {
      time: number;
      $onHoverPreviewChange: ControlBarProps["$onHoverPreviewChange"];
    }
  }
  // components/Videoplayer/SettingsMenu
  namespace components_Videoplayer_SettingsMenu {
    interface ItemMenuProps {
      onClick: () => void;
      title: string;
      value?: string | number;
    }
    interface SettingsItemProps {
      $selected?: boolean;
    }
    interface SettingsMenuProps {
      $mainMenu?: boolean;
    }
  }
  // components/Videoplayer/Tag
  namespace components_Videoplayer_Tag {
    interface TagProps {
      $type?: TagType;
    }
    type TagType = "time" | "popup" | "video";
  }
  // components/errors/ErrorBoundary
  namespace components_errors_ErrorBoundary {
    interface ErrorBoundaryProps {
      onReset?: (...args: Array<unknown>) => void;
      onError?: (error: Error, errorInfo: ErrorInfo) => void;
      fallbackComponent?: ComponentType<FallbackProps>;
    }
    interface ErrorBoundaryState {
      error: Error | null;
    }
    interface FallbackProps {
      error: Error;
      resetErrorBoundary: (...args: Array<unknown>) => void;
    }
  }
  // hooks/useScreenSize
  namespace hooks_useScreenSize {
    type ThemeScreenSize = "desktop" | "mobile" | "tablet";
  }
  // hooks/useScrollLock
  namespace hooks_useScrollLock {
    type UseScrollLockOptions = {
      autoLock?: boolean;
      lockTarget?: HTMLElement | string;
      widthReflow?: boolean;
    };
    type UseScrollLockReturn = {
      isLocked: boolean;
      lock: () => void;
      unlock: () => void;
    };
  }
  // pages
  namespace pages {
    type ComponentsMap = {
      Button: typeof Button;
      Text: typeof Text;
      Container: typeof Container;
    };
    type ComponentType = keyof ComponentTypeMap;
    type ComponentTypeMap = {
      Text: TextProps;
      Button: ButtonProps;
    };
    interface IGetDataPayload {
      url: string;
      fetchOpts: {
        headers: any;
      };
      vars: Record<string, string>;
    }
    interface IInteractiveAction {
      type: "getData" | "postData" | "openWindow" | "updateWidget";
      trigger: "onClick" | "onChange";
      payload: IPostDataPayload | IUpdateWidgetPayload | IOpenWindow;
    }
    interface ILifecycleAction {
      type: "getData" | "postData" | "updateWidget";
      phase: "mount" | "active" | "update" | "unmount";
      payload: IGetDataPayload | IPostDataPayload | IUpdateWidgetPayload;
    }
    interface IMUIE {
      id: string;
      type: ComponentType;
      keys: string[];
      props: ComponentTypeMap[ComponentType];
      children: [];
      actions: {
        lifecycle: ILifecycleAction[];
        interactive: IInteractiveAction[];
      };
    }
    interface IOpenWindow {
      url: string;
      target: "_blank" | "_self" | "_parent";
      event: "onClick" | "onBlur" | "onMouseOver";
    }
    interface IPostDataPayload {
      url: string;
      fetchOpts: {
        method: "POST" | "PUT" | "DELETE";
        headers: any;
      };
      body: any;
    }
    interface IUpdateWidgetPayload {
      current: string;
      new: string;
    }
  }
  // test
  namespace test {
    interface ThemeProviderProps
      extends Pick<ComponentProps<typeof TokensProvider>, "name" | "mode"> {
      screenSize?: ThemeScreenSize;
    }
  }
  // test-utils
  namespace test_utils {
    interface DOMRectOptions {
      x: number;
      y: number;
      height: number;
      width: number;
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
      toJSON?: () => void;
    }
    interface MockProps {
      name: string;
    }
  }
  // theme
  namespace theme {
    type Breakpoints = typeof all[number];
    interface DefaultTheme extends UITheme {}
    type F = (theme: UITheme) => ResponsiveStyleValue<SystemCssProperties>;
    interface PositionProps {
      zIndex?: ResponsiveValue<
        ThemeValue<"zIndices", UITheme> | CSS.Property.ZIndex,
        UITheme
      >;
    }
    type Theme = typeof theme & {
      borderWidths: ObjectOrArray<number>;
      layoutColumnWidth?: number[];
      radii: ObjectOrArray<number>;
      screenSize: ThemeScreenSize;
    } & TokensTheme;
  }
  // types
  namespace types {
    type CustomStyledProps<T extends string = string> = Record<
      T,
      Record<string, unknown> | ((theme: DefaultTheme) => CSSProperties)
    >;
  }
  // utils
  namespace utils {
    type ThrottledFunc<T extends (...args: any[]) => any> = (
      ...args: Parameters<T>
    ) => void;
  }
  // utils/floating-ui
  namespace utils_floating_ui {
    type ArrowElem = SVGSVGElement | null;
    interface FloatingContextArgs
      extends Pick<UseFloatingReturn, "refs" | "context" | "floatingStyles">,
        Pick<
          ReturnType<typeof useInteractions>,
          "getFloatingProps" | "getReferenceProps"
        > {
      arrowComponent?: ReactElement;
      arrowRef: MutableRefObject<ArrowElem>;
      open: boolean;
      strategy: Strategy;
    }
    interface FloatingProps {
      isOpen?: boolean;
      onChange?: (isOpen: boolean) => void;
      disabled?: boolean;
      interactionType?: InteractionType[];
      trigger?: ReactElement;
      placement?: Placement;
      strategy?: Strategy;
      middleware?: Middleware[];
      delay?: number | UseHoverProps["delay"];
      arrowComponent?: ReactElement;
      arrowPadding?: number;
    }
    type InteractionType =
      | "hover"
      | "click"
      | "focus"
      | "dismiss"
      | "clientPoint";
  }
  // utils/fullscreen
  namespace utils_fullscreen {
    interface DivElementWithPrefixes {
      msRequestFullscreen?: () => void;
      webkitRequestFullscreen?: () => void;
    }
    interface Document extends DocumentWithPrefixes {}
    interface DocumentWithPrefixes {
      fullscreenElement: Element | null;
      msFullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      msExitFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
      webkitFullscreenEnabled?: boolean;
      msFullscreenEnabled?: boolean;
    }
    interface HTMLDivElement extends DivElementWithPrefixes {}
  }
}
export = ProjectTypes;