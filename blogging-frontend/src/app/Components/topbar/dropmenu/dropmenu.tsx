import Icon from './item';

type DropMenuProps = {
  toggleMenu: () => void;
  dropMenuActive: boolean;
};

export default function DropMenu({ toggleMenu }: DropMenuProps) {
    return (
        <div
            className="fixed inset-0"
            onClick={toggleMenu}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-16 left-1 w-fit max-w-[90vw] rounded-lg bg-[#7558ca] dark:bg-[#5b4296] p-4 shadow-lg ring-1 ring-black/10 space-y-3"
            >
                <Icon Text="Account" IconUrl="/svgs/dropmenu/account.svg" />
                <Icon Text="Settings" IconUrl="/svgs/dropmenu/settings.svg" />
            </div>
        </div>
    );
}
