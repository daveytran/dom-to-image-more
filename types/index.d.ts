export interface DomToImage {
    toSvg(node: Node, options?: Options): Promise<string>;
    toPng(node: Node, options?: Options): Promise<string>;
    toJpeg(node: Node, options?: Options): Promise<string>;
    toBlob(node: Node, options?: Options): Promise<Blob>;
    toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
}

export interface Options {
    filter?: ((node: Node) => boolean) | undefined;
    bgcolor?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
    style?: {} | undefined;
    quality?: number | undefined;
    imagePlaceholder?: string | undefined;
    cacheBust?: boolean | undefined;
    ignoreCSSRuleErrors?: boolean | undefined;
    filterStyles?: ((node: Node, propertyName: string) => boolean) | undefined;
    adjustClonedNode?: ((node: Node, clone: Node, after: boolean) => Node) | undefined;
    onclone?: ((clone: Node) => void) | undefined;
    useCredentials?: boolean | undefined;
    useCredentialsFilters?: string[] | undefined;
    corsImg?: string | undefined;
    copyDefaultStyles?: boolean | undefined;
    styleCaching?: 'strict' | 'relaxed' | undefined;
    scale?: number | undefined;
}

export const DomToImage: DomToImage;

type DomToImage_ = DomToImage;
type Options_ = Options;

export default DomToImage;

declare global {
    namespace DomToImage {
        type Options = Options_;
        type DomToImage = DomToImage_;
    }

    const DomToImage: DomToImage.DomToImage;
}
