/**
 * Main interface for the dom-to-image-more library functions
 */
export interface DomToImage {
    /**
     * Converts the given DOM node to an SVG image encoded as a data URL.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with the SVG data URL
     */
    toSvg(node: Node, options?: Options): Promise<string>;

    /**
     * Converts the given DOM node to a PNG image encoded as a data URL.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with the PNG data URL
     */
    toPng(node: Node, options?: Options): Promise<string>;

    /**
     * Converts the given DOM node to a JPEG image encoded as a data URL.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with the JPEG data URL
     */
    toJpeg(node: Node, options?: Options): Promise<string>;

    /**
     * Converts the given DOM node to a Blob containing the image data.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with a Blob
     */
    toBlob(node: Node, options?: Options): Promise<Blob>;

    /**
     * Converts the given DOM node to raw pixel data.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with a Uint8ClampedArray containing RGBA data
     */
    toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;

    /**
     * Converts the given DOM node to a Canvas element.
     * @param node - The DOM node to convert
     * @param options - Optional configuration options
     * @returns A Promise that resolves with an HTMLCanvasElement
     */
    toCanvas(node: Node, options?: Options): Promise<HTMLCanvasElement>;
}

/**
 * Configuration options for the DOM node to image conversion
 */
export interface Options {
    /**
     * A function that determines whether a node should be included in the output.
     * Return true to include the node (and its children), false to exclude it.
     * This is not called on the root node.
     * @param node - The node to filter
     */
    filter?: ((node: Node) => boolean) | undefined;

    /**
     * Background color for the image. Any valid CSS color value is acceptable.
     */
    bgcolor?: string | undefined;

    /**
     * Width in pixels to be applied to the node before rendering.
     * If not specified, the node's actual width will be used.
     */
    width?: number | undefined;

    /**
     * Height in pixels to be applied to the node before rendering.
     * If not specified, the node's actual height will be used.
     */
    height?: number | undefined;

    /**
     * CSS styles to be applied to the node before rendering.
     * The object's properties should be JavaScript CSS property names.
     */
    style?: Record<string, any> | undefined;

    /**
     * A number between 0 and 1 indicating the JPEG image quality.
     * Only applies to toJpeg method.
     * @default 1.0
     */
    quality?: number | undefined;

    /**
     * A data URL for a placeholder image to use when fetching an image fails.
     * If not specified, the promise will be rejected on failed images.
     */
    imagePlaceholder?: string | undefined;

    /**
     * Appends the current time as a query string to URL requests to enable cache busting.
     * @default false
     */
    cacheBust?: boolean | undefined;

    /**
     * Determines whether console errors should be suppressed when CSS rules
     * can't be accessed due to CORS restrictions or other issues.
     * @default false
     */
    ignoreCSSRuleErrors?: boolean | undefined;

    /**
     * A function that determines whether a style property should be included in the output.
     * @param node - The node being processed
     * @param propertyName - The name of the style property being considered
     * @returns True to include the property, false to exclude it
     */
    filterStyles?: ((node: Node, propertyName: string) => boolean) | undefined;

    /**
     * A function that will be invoked on each node as they are cloned,
     * allowing adjustments before the conversion. Called both before and after
     * children are cloned.
     * @param node - The original node being cloned
     * @param clone - The cloned node
     * @param after - Boolean indicating if children have been cloned (true) or not yet (false)
     * @returns The potentially modified clone
     */
    adjustClonedNode?: ((node: Node, clone: Node, after: boolean) => Node) | undefined;

    /**
     * A function that is called after the entire DOM has been cloned,
     * allowing for final adjustments to the clone before rendering.
     * @param clone - The cloned DOM root node
     */
    onclone?: ((clone: Node) => void) | undefined;

    /**
     * Whether to include credentials in external resource requests.
     * @default false
     */
    useCredentials?: boolean | undefined;

    /**
     * Array of string patterns to match URLs against to determine if useCredentials
     * should be used for that specific request.
     */
    useCredentialsFilters?: string[] | undefined;

    /**
     * Configuration for a CORS proxy to fetch images from cross-origin sources.
     * Used when images can't be loaded directly due to CORS restrictions.
     */
    corsImg?:
        | {
              /**
               * HTTP method to use for the proxy request. 'GET' or 'POST'.
               * @default 'GET'
               */
              method?: string;

              /**
               * URL of the proxy service. The string '#{cors}' will be replaced with the actual image URL.
               * Example: 'https://proxy.example.com/fetch?url=#{cors}'
               */
              url?: string;

              /**
               * HTTP headers to send with the proxy request.
               */
              headers?: Record<string, string>;

              /**
               * Data to send with the request (especially useful for POST requests).
               * String values containing '#{cors}' will be replaced with the actual image URL.
               */
              data?: any;
          }
        | undefined;

    /**
     * Whether to copy the default styles of elements.
     * Enabling this makes the process faster but may cause style differences.
     * @default true
     */
    copyDefaultStyles?: boolean | undefined;

    /**
     * Controls how aggressively styles are cached during processing.
     * 'strict' - Caches using the full element hierarchy
     * 'relaxed' - Uses a more relaxed caching algorithm
     * @default 'strict'
     */
    styleCaching?: 'strict' | 'relaxed' | undefined;

    /**
     * Scale value to be applied to the canvas's ctx.scale() on both x and y axis.
     * Can be used to increase the image quality with higher image size.
     * @default 1
     */
    scale?: number | undefined;
}

/**
 * The main exported DOM to Image instance
 */
export const DomToImage: DomToImage;

/**
 * Internal type aliases for use in global namespace declaration
 */
type DomToImage_ = DomToImage;
type Options_ = Options;

/**
 * Default export for ES modules
 */
export default DomToImage;

/**
 * Global namespace declaration for UMD/browser usage
 */
declare global {
    namespace DomToImage {
        type Options = Options_;
        type DomToImage = DomToImage_;
    }

    const DomToImage: DomToImage.DomToImage;
}
