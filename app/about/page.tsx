import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'About the Open Memory Specification (OMS) — the open standard for immutable, content-addressed agent memory. The .mg container is defined by OMS.  OWF Final licensed, standards-track, community-driven.',
})

export default function AboutPage() {
  return (
    <div style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div className="container-content" style={{ maxWidth: 760 }}>
        <header style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            About
          </p>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--fg)', marginBottom: '1rem' }}>
            What is the Open Memory Specification?
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--fg-secondary)', lineHeight: 1.75 }}>
            The Open Memory Specification (OMS) is a standards-track open standard for interoperable, auditable, and portable agent memory. OMS defines the Memory Grain (.mg) container — the binary wire format for immutable, content-addressed knowledge units.
          </p>
        </header>

        <div className="prose">
          <h2>OMS at a Glance</h2>
          <p>
            OMS is structured as a family of specifications. This document defines the Memory Grain (.mg) container — the atomic wire format for agent knowledge. Future parts will cover query and retrieval protocols, registry APIs, and transport bindings. All parts share the same design principles and licensing.
          </p>

          <h2>The Problem</h2>
          <p>
            Autonomous systems — AI agents, robots, self-driving cars, IoT networks — need persistent memory. Today, each system invents its own ad-hoc storage: JSON blobs, SQLite tables, vector database records. None of these are <strong>portable</strong>, <strong>verifiable</strong>, or <strong>compliance-ready</strong> by design.
          </p>
          <p>
            If a robot learns that a dock is temporarily closed, how does it prove that fact wasn't tampered with? If a fleet needs to share knowledge between 50 robots, how does it deduplicate identical observations? If a healthcare AI processes patient data, how does it guarantee HIPAA-compliant erasure?
          </p>
          <p>
            There was no universal answer — until .mg.
          </p>

          <h2>The Solution</h2>
          <p>
            OMS applies the same insight that made Git revolutionary: <strong>content addressing</strong>. The SHA-256 hash of a memory grain <em>is</em> its unique identifier. Any change produces a different hash. Identical content across any system produces the same hash.
          </p>
          <p>
            This gives you integrity, deduplication, and portability for free — without any central registry or authority.
          </p>

          <h2>Design Principles</h2>
          <ol>
            <li><strong>References, not blobs</strong> — Multi-modal content is referenced by URI, never embedded</li>
            <li><strong>Additive evolution</strong> — New fields never break old implementations</li>
            <li><strong>Compliance by design</strong> — GDPR, HIPAA, and CCPA primitives are in the wire format</li>
            <li><strong>Sign without PKI</strong> — W3C DIDs enable verification without certificate authorities</li>
            <li><strong>One file, full memory</strong> — A .mg container is the portable unit for full knowledge export</li>
          </ol>

          <h2>The .mg Container Definition</h2>
          <p>
            OMS v1.2 spans 28 sections and 7 appendices covering blob layout, canonical serialization, content addressing, field compaction, ten grain types, cryptographic signing (COSE Sign1), selective disclosure, the .mg file format, identity (W3C DIDs), sensitivity classification, provenance, temporal modeling, conformance levels, device profiles, grain protection, observer type registry, query conventions, domain profile extensions (healthcare, legal, finance, robotics, science, consumer), and security considerations.
          </p>
          <p>
            <Link href="/spec">Read the full OM specification →</Link>
          </p>

          <h2>License</h2>
          <p>
            The specification is published under the <a href="https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0" target="_blank" rel="noopener noreferrer">Open Web Foundation Final Specification Agreement (OWF Final)</a> — the same license used by the W3C, OpenID Foundation, and OASIS. It is specifically designed for open standards: patent-clean, contributor-friendly, and suitable for submission to standards bodies.
          </p>

          <h2>Version History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Date</th>
                  <th>Changes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>1.0</code></td>
                  <td>2026-02-19</td>
                  <td>Initial publication — 9-byte fixed header, canonical serialization, content addressing, seven memory types (Fact, Episode, Checkpoint, Workflow, ToolCall, Observation, Goal), COSE signing, selective disclosure, .mg container files, W3C DIDs, sensitivity bits, provenance, temporal modeling, conformance levels, device profiles</td>
                </tr>
                <tr>
                  <td><code>1.1</code></td>
                  <td>2026-02-20</td>
                  <td>Generalized Observer model — renamed sensor_id→observer_id (oid), sensor_type→observer_type (otype); four new Observation fields; Observer Type Registry (§24); Observation Mode (§25) and Scope (§26) registries</td>
                </tr>
                <tr>
                  <td><code>1.2</code></td>
                  <td>2026-02-23</td>
                  <td>Ten grain types — type renames (Fact→Belief, Episode→Event, Checkpoint→State, ToolCall→Action); three new types (Reasoning 0x08, Consensus 0x09, Consent 0x0A); Immutability Boundary; mg: relation vocabulary (21 relations); Domain Profile Extensions (Appendix A–G); Action phase model; Query Conventions (§28); HIPAA PHI tag normalization; Goal delegation scope fields; retention_policy; recall_priority; hold and consent_cascade invalidation modes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Contributing</h2>
          <p>
            The specification is open source. Contributions welcome:
          </p>
          <ul>
            <li><strong>Implementations</strong> — Python (reference), Go, Rust, JavaScript, Java, C#</li>
            <li><strong>Test vectors</strong> — Edge case coverage, new memory types</li>
            <li><strong>Standards review</strong> — IETF/W3C experience welcome</li>
            <li><strong>Compliance expertise</strong> — GDPR, HIPAA, CCPA, SOX</li>
          </ul>
          <p>
            <a href="https://github.com/openmemoryspec/oms" target="_blank" rel="noopener noreferrer">github.com/openmemoryspec/oms →</a>
          </p>

          <h2>AI Discoverability</h2>
          <p>
            This site is designed to be discoverable by AI search engines. We provide:
          </p>
          <ul>
            <li><a href="/llms.txt">llms.txt</a> — Site index for LLM crawlers</li>
            <li><a href="/llms-full.txt">llms-full.txt</a> — Full specification in plain text</li>
            <li><a href="/sitemap.xml">sitemap.xml</a> — All pages and blog posts</li>
            <li>JSON-LD structured data on every page</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
