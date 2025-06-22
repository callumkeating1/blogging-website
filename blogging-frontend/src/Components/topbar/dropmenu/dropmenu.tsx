import Icon from './item'
type MyComponentProps = {
  toggleMenu: () => void;
  dropMenuActive: boolean;
};
export default function DropMenu({toggleMenu}:MyComponentProps) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen" onClick={toggleMenu}>
            <div className="fixed top-16 right-8 bg-zinc-500 dark:bg-zinc-700 p-5 text-xl rounded-md ring-1 ring-black"  onClick={e => e.stopPropagation()}>
                <Icon Text='account' IconUrl='/svgs/dropmenu/account.svg' />
                <Icon Text='settings' IconUrl='/svgs/dropmenu/settings.svg' />
            </div>
        </div>
    )
}
